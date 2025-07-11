import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Переконайтеся, що імпортуєте глобальні стилі, включаючи Tailwind
import App from "./App.js"; // Імпортуємо наш головний компонент App

// Знаходимо кореневий DOM-елемент, куди буде рендеритися React-додаток
const rootElement = document.getElementById("root");

// Створюємо кореневий об'єкт React для рендерингу
const root = createRoot(rootElement);

// Рендеримо компонент App всередині StrictMode для виявлення потенційних проблем
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
