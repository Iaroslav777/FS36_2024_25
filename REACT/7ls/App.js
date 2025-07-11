import React from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

// Головний компонент додатку
class App extends React.Component {
  render() {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-between p-4 font-sans">
        <Header />
        <Content />
        <Footer />
      </div>
    );
  }
}

export default App;
