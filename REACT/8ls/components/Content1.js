import React, { Component } from "react";

// Класова компонента Content1
class Content1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      bgColor: "bg-yellow-100",
      statusMessage: "Лічильник працює...",
    };
    console.log("Content1: constructor - Компонент ініціалізовано.");
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Оптимізація: оновлюємо компонент лише якщо змінився лічильник, колір фону або повідомлення
    if (
      nextState.counter !== this.state.counter ||
      nextState.bgColor !== this.state.bgColor ||
      nextState.statusMessage !== this.state.statusMessage
    ) {
      console.log("Content1: shouldComponentUpdate - Дозволено оновлення.");
      return true;
    }
    console.log("Content1: shouldComponentUpdate - Оновлення заблоковано.");
    return false;
  }

  componentDidMount() {
    console.log("Content1: componentDidMount - Компонент змонтовано.");
    // Запускаємо інтервал, який збільшує лічильник кожну секунду
    this.intervalId = setInterval(() => {
      this.setState((prevState) => {
        const newCounter = prevState.counter + 1;
        let newBgColor = prevState.bgColor;
        let newStatusMessage = prevState.statusMessage;

        if (newCounter % 5 === 0) {
          // Змінюємо відтінок жовтого кожні 5 секунд
          const shades = [
            "bg-yellow-100",
            "bg-yellow-200",
            "bg-yellow-300",
            "bg-yellow-400",
            "bg-yellow-500",
          ];
          newBgColor = shades[Math.floor(newCounter / 5) % shades.length];
          newStatusMessage = `Лічильник досяг ${newCounter}!`;
        } else {
          newStatusMessage = "Лічильник працює...";
        }
        return {
          counter: newCounter,
          bgColor: newBgColor,
          statusMessage: newStatusMessage,
        };
      });
      console.log("Content1: componentDidMount - Лічильник оновлено.");
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Content1: componentDidUpdate - Компонент оновлено.");
    // Логуємо зміну лічильника
    if (prevState.counter !== this.state.counter) {
      console.log(
        `Content1: componentDidUpdate - Лічильник змінився на: ${this.state.counter}`
      );
    }
    // Відображаємо статус у DOM
    const statusElement = document.getElementById("content1-status");
    if (statusElement && prevState.statusMessage !== this.state.statusMessage) {
      statusElement.textContent = `Статус: ${this.state.statusMessage}`;
    }
  }

  componentWillUnmount() {
    console.log("Content1: componentWillUnmount - Компонент буде демонтовано.");
    // Очищаємо інтервал, щоб уникнути витоків пам'яті
    if (this.intervalId) {
      clearInterval(this.intervalId);
      console.log("Content1: componentWillUnmount - Інтервал очищено.");
    }
  }

  render() {
    console.log("Content1: render - Компонент рендериться.");
    const { counter, bgColor, statusMessage } = this.state;
    const textColor = counter % 2 === 0 ? "text-blue-700" : "text-red-700"; // Зміна кольору тексту

    return (
      <div
        className={`${bgColor} p-6 rounded-lg shadow-xl text-center mb-8 transition-colors duration-500`}
      >
        <h2 className="text-3xl font-bold mb-3">
          Динамічний Контент 1 (Класовий)
        </h2>
        <p
          className={`text-6xl font-extrabold ${textColor} transition-colors duration-500`}
        >
          {counter}
        </p>
        <p className="text-lg mt-4">Цей лічильник оновлюється кожну секунду.</p>
        <p className="text-sm opacity-80">
          Колір фону змінюється кожні 5 секунд.
        </p>
        <p id="content1-status" className="mt-2 text-gray-700 font-medium">
          Статус: {statusMessage}
        </p>
      </div>
    );
  }
}

export default Content1;
