import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./styles/index.scss";
import App from "./App";

document.body.style.backgroundColor = "black"; // Prevent white flash on load

const root = ReactDOMClient.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
