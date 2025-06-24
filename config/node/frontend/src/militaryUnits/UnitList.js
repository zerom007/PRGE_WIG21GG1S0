import React from "react";
import "./mu.css";
import { useNavigate } from "react-router-dom";

function UnitList({ units }) {
  const navigate = useNavigate();

  const handleClick = (unit) => {
    navigate("/services/map", { state: { focusUnit: unit } });
  };

  return (
    <div className="unitList">
      {units.map((unit) => {
        return (
          <div
            className="unitlist_Card"
            key={unit.id}
            onClick={() => handleClick(unit)}
            style={{ cursor: "pointer" }}
          >
            {unit.name}
          </div>
        );
      })}
    </div>
  );
}

export default UnitList;
