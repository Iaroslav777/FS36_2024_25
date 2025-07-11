import React from "react";
import Wrapper from "./components/Wrapper"; // Модульне імпортування Wrapper

// Головний компонент додатку
class App extends React.Component {
  render() {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
        {/* Wrapper тепер є головним контейнером для умовного рендерингу */}
        <Wrapper />
      </div>
    );
  }
}

export default App;
