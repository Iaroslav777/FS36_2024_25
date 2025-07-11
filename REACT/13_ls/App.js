import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { MainLayout } from "./components"; // Імпортуємо MainLayout з файлу index.js в components

// Головний компонент додатку, що налаштовує роутер
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-4 font-sans">
        <MainLayout />
      </div>
    </Router>
  );
}

export default App;
