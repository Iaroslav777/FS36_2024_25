import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Базові стилі та Tailwind CSS
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux"; // Redux Store

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {" "}
      {/* Обгортаємо весь додаток Redux Provider'ом */}
      <App />
    </Provider>
  </React.StrictMode>
);
