import React from "react";
import TodoListApp from "./components/TodoListApp";

// Головний компонент додатку
function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <TodoListApp />
    </div>
  );
}

export default App;
