import React from "react";
import { Link } from "react-router-dom";

export default function TopToolbar() {
  return (
    <div
      style={{
        width: "100px",
        height: "56px",
        background: "transparent",
        float: "right",
        paddingRight: "200px",
      }}
    >
      <Link to="/home" className="title">
        <h1>Worktime</h1>
      </Link>
    </div>
  );
}
