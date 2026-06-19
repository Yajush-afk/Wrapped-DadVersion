import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/bowlby-one-sc/latin-400.css";
import "@fontsource/fraunces/latin-400.css";
import "@fontsource/fraunces/latin-600.css";
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-700.css";
import App from "./App";
import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/wrapped.css";
import "./styles/constellation.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
