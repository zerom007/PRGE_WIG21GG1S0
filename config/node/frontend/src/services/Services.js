import React from "react";
import "./Services.css";
import { Link } from "react-router-dom";
import restauracja from "./ChatGPT Image 23 cze 2025, 18_43_34.png";

function Services() {
  return (
    <div className="services">
      {/* utworze górny */}

      <div className="services_bottom">
        <div className="services_bottomLeft">
          <div className="services_top">
            <h1 className="home_title">Dostępne usługi</h1>
          </div>
          <div className="services_buttons">
            <Link to="map">
              <button
                className="services_button"
                id="mapa"
                onClick={() => console.log("kliknięto")}
              >
                Mapa dostępnych restauracji
              </button>
            </Link>
            <Link to="militaryunits">
              <button className="services_button" id="lista">
                Wykaz restauracji
              </button>
            </Link>
          </div>
        </div>
        <div className="services_bottomRight">
          <div className="services_imageItem"></div>
        </div>
      </div>
    </div>
  );
}

export default Services;
