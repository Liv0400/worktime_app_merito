import React from "react";
import { Link } from "react-router-dom";
import "./Grafik.css";
export const Grafik = () => {
  return (
    <main>
      <Link to="/Stworz_grafik">
        <button className="Utwórz_grafik">Utwórz grafik</button>
      </Link>
      <div className="Grafik"></div>
    </main>
  );
};
