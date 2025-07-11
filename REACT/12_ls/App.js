import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import FormikApp from "./components/FormikApp";

// Головний компонент додатку, що налаштовує роутер
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
        <FormikApp />
      </div>
    </Router>
  );
}

export default App;
