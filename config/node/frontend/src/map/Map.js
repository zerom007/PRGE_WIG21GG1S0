import React, { useEffect, useState } from "react";
import {
  MapContainer,
  WMSTileLayer,
  TileLayer,
  LayersControl,
  Marker,
  Popup,
  GeoJSON,
  useMap,
} from "react-leaflet";

import axios from "axios";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import MarkerPlacement from "./MarkerPlacement";
import { DefaultIcon } from "./icon";

// Pomocniczy komponent do mapy, żeby mieć dostęp do obiektu mapy
function MarkersWithZoom({ units }) {
  const map = useMap();

  return (
    <>
      {units.map((unit) => (
        <Marker
          key={unit.id}
          position={[unit.lat, unit.lng]}
          eventHandlers={{
            click: () => {
              map.flyTo([unit.lat, unit.lng], 15, {
                animate: true,
                duration: 3,
              });
            },
          }}
        >
          <Popup>
            <h5>{unit.name}</h5>
            <div>
              <p>
                <strong>Adres:</strong> {unit.address}
              </p>
              <p>
                <strong>Telefon:</strong> {unit.phone}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}

function Map({ units }) {
  const [countries_wat, setCountries_wat] = useState();
  const [wojewodztwa, setWojewodztwa] = useState();
  const [powiaty, setPowiaty] = useState();

  useEffect(() => {
    axios
      .get(
        "http://localhost:9000/geoserver/wat-geoservices/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=wat-geoservices%3Ane_10m_admin_0_countries&outputFormat=application%2Fjson"
      )
      .then((dane) => {
        setCountries_wat(dane.data);
      });

    axios
      .get(
        "http://localhost:9000/geoserver/wat-geoservices/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=wat-geoservices%3AA01_Granice_wojewodztw&outputFormat=application%2Fjson"
      )
      .then((dane) => {
        setWojewodztwa(dane.data);
      });

    axios
      .get(
        "http://localhost:9000/geoserver/wat-geoservices/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=wat-geoservices%3AA02_Granice_powiatow&outputFormat=application%2Fjson"
      )
      .then((dane) => {
        setPowiaty(dane.data);
      });
  }, []);

  return (
    <div className="map">
      <MapContainer center={[52.0, 19.8]} zoom={7} style={{ height: "100vh" }}>
        <LayersControl>
          <LayersControl.BaseLayer checked name="OSM">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="WMS google Satelite">
            <TileLayer url="http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}" />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="wat-countries">
            <WMSTileLayer
              layers="ne_10m_admin_0_countries"
              url="http://localhost:9000/geoserver/wat-geoservices/ows"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="wat_wojewodztwa">
            <WMSTileLayer
              layers="A01_Granice_wojewodztw"
              url="http://localhost:9000/geoserver/wat-geoservices/ows"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="wat_powiaty">
            <WMSTileLayer
              layers="A02_Granice_powiatow"
              url="http://localhost:9000/geoserver/wat-geoservices/ows"
            />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay name="Countries">
            {countries_wat ? <GeoJSON data={countries_wat} /> : ""}
          </LayersControl.Overlay>

          <MarkerPlacement />
        </LayersControl>

        {/* Używamy komponentu z obsługą kliknięć i zoomu */}
        <MarkersWithZoom units={units} />
      </MapContainer>
    </div>
  );
}

export default Map;
