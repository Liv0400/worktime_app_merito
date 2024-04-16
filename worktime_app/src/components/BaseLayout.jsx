import React from "react";
import { Navbar } from "../components/Navbar";
import TopToolbar from "./TopToolbar";

export default function BaseLayout(props) {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ width: "200px", height: "100%" }}>
        <Navbar />
      </div>
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{ width: "100%", height: "56px", background: "#333" }}>
          <TopToolbar />
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  );
}
