import React from "react";
import ReactDOM from "react-dom";
import "/Users/VCNTX/Development/code/phase5/street-food-projectv2/client/src/App.css";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
