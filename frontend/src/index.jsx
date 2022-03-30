import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";

document.body.style.backgroundColor = "black"; // Prevent white flash on load

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
