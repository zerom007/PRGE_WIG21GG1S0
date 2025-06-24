import React from "react";
import "./Home.css";
import zdjecie from "./ChatGPT Image 23 cze 2025, 12_22_26.png";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="home">
      <div className="home_top">
        <div> </div>
      </div>
      <div className="home_bottom">
        <div className="home_left"></div>
        <div className="home_right">
          <h1 className="home_title">
            <span style={{ color: "white", opacity: "75" }}>RES</span>
            <span style={{ color: "wheat" }}>taurator</span>
          </h1>
          <div className="home_subtitle" style={{ color: "wheat" }}>
            System zarządzania siecią restauracji
          </div>

          <Link to="services">
            <button className="home_button">Sprawdź!</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
