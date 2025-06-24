import React, { useState } from "react";
import { Marker, Popup, useMapEvent, Circle } from "react-leaflet";

function MarkerPlacement() {
  const [coord, setCoord] = useState();
  const [mass, setMass] = useState(0);

  const promienRazenia = (mass) => {
    console.log(Math.pow(mass, 1 / 3) / Math.pow(80 / 980, 1 / 1.89));
    return Math.pow(mass, 1 / 3) / Math.pow(80 / 980, 1 / 1.89);
  };

  const map = useMapEvent({
    click: (event) => {
      console.log(event.latlng);
      setCoord(event.latlng);
    },
  });
  return (
    <div>
      {/* {coord ? (
        <Marker position={coord}>
          <Popup>
            Wybierz interesujący Cię obszar
            <input
              type="range"
              min="0"
              max="1000000000"
              defaultValue="0.6"
              onChange={(event) => setMass(event.target.value)}
            />
            {mass} km
          </Popup>
          <Circle
            center={coord}
            radius={promienRazenia(mass)}
            pathOptions={{ color: "red" }}
          ></Circle>
        </Marker>
      ) : (
        ""
      )} */}
    </div>
  );
}

export default MarkerPlacement;
