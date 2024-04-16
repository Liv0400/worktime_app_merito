import React from "react";
import { Link } from "react-router-dom";

export default function TopToolbar() {
  return (
    <div
      style={{
        width: "100px",
        height: "56px",
        background: "#333",
        float: "right",
        paddingRight: "200px",
      }}
    >
      <Link to="/" className="title">
        <h1>Worktime</h1>
      </Link>
    </div>
  );
}
