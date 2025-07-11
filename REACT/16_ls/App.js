import React from "react";
import { Provider } from "react-redux";
import store from "./redux"; // Імпортуємо налаштований Redux Store з index.js
import { Counter } from "./components"; // Імпортуємо компонент лічильника з index.js

// Головний компонент додатку, що обгортає Counter Redux Provider'ом
function App() {
  return (
    <Provider store={store}>
      {" "}
      {/* Робить Redux Store доступним для всіх компонентів */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
        <Counter />
      </div>
    </Provider>
  );
}

export default App;
