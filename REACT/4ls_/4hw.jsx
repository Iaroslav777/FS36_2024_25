import React, { Component } from "react";

// Головний компонент додатку (класовий)
class App extends Component {
  render() {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
        <HomeworkPage />
      </div>
    );
  }
}

// Компонент-обгортка HomeworkPage (класовий)
class HomeworkPage extends Component {
  constructor(props) {
    super(props);
    // 3 об'єкти з довільною інформацією для прокидання через props
    this.headerData = {
      title: "Привіт з Заголовка!",
      description: "Це верхня частина нашої сторінки.",
      version: "1.0",
    };

    this.footerData = {
      text: "© 2025 Моє Домашнє Завдання. Всі права захищені.",
    };

    this.sidebarData = {
      menuItems: ["Головна", "Про нас", "Послуги", "Контакти"],
      isOpen: true, // Приклад для умовного рендерингу
      info: "Бічна панель з навігацією.",
    };
  }

  render() {
    return (
      <div className="flex flex-col w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden md:flex-row">
        {/* Клас для Sidebar */}
        <div className="w-full md:w-1/4 bg-blue-600 text-white p-4 rounded-tl-lg md:rounded-bl-lg md:rounded-tr-none">
          <Sidebar data={this.sidebarData} />
        </div>

        <div className="flex flex-col w-full md:w-3/4">
          {/* Клас для Header */}
          <div className="w-full bg-blue-500 text-white p-4 rounded-tr-lg md:rounded-tr-lg md:rounded-tl-none">
            <Header data={this.headerData} />
          </div>

          {/* Клас для Content */}
          <div className="flex-grow p-6 bg-gray-50 overflow-y-auto">
            <Content />
          </div>

          {/* Клас для Footer */}
          <div className="w-full bg-gray-800 text-white p-4 rounded-br-lg md:rounded-br-lg md:rounded-bl-none">
            <Footer data={this.footerData} />
          </div>
        </div>
      </div>
    );
  }
}

// Компонент Header (класовий)
class Header extends Component {
  render() {
    const { data } = this.props;
    return (
      <header className="text-center">
        <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
        <p className="text-lg">{data.description}</p>
        <span className="text-sm opacity-80">Версія: {data.version}</span>
      </header>
    );
  }
}

// Компонент Footer (класовий)
class Footer extends Component {
  render() {
    const { data } = this.props;
    return (
      <footer className="text-center text-sm">
        <p className="mb-1">{data.text}</p>
      </footer>
    );
  }
}

// Компонент Sidebar (класовий, з демонстрацією умовного рендерингу)
class Sidebar extends Component {
  render() {
    const { data } = this.props;
    return (
      <aside className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Навігація</h2>
        {/* Умовний рендеринг: показуємо меню, якщо isOpen true */}
        {data.isOpen ? (
          <ul className="space-y-2">
            {data.menuItems.map((item, index) => (
              <li
                key={index}
                className="text-lg hover:text-blue-200 cursor-pointer transition-colors duration-200"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-300">Меню тимчасово недоступне.</p>
        )}
        <p className="mt-4 text-sm opacity-90">{data.info}</p>
      </aside>
    );
  }
}

// Компонент Content (класовий, з демонстрацією інтерполяції, лічильника та подій)
class Content extends Component {
  constructor(props) {
    super(props);
    // Об'єкт з 2 полями
    this.contentInfo = {
      title: "Ласкаво просимо до нашого додатку!",
      describe:
        "Тут ви знайдете цікавий контент та інтерактивні елементи. Цей розділ демонструє виведення даних, роботу лічильника та обробку подій.",
    };
  }

  render() {
    return (
      <main className="text-gray-800">
        <h1 className="text-4xl font-bold mb-4 text-center">
          {this.contentInfo.title}
        </h1>
        <p className="text-lg leading-relaxed mb-8 text-center">
          {this.contentInfo.describe}
        </p>

        <div className="flex flex-col items-center mt-8 space-y-8">
          <Count />
          <MyEvents /> {/* Нова компонента для демонстрації подій */}
        </div>
      </main>
    );
  }
}

// Компонент Count (класовий лічильник)
class Count extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    // Прив'язка контексту 'this' до методів
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }

  increment() {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  }

  decrement() {
    this.setState((prevState) => ({
      count: prevState.count - 1,
    }));
  }

  reset() {
    this.setState({
      count: 0,
    });
  }

  render() {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-4 text-blue-700">Лічильник</h2>
        <p className="text-6xl font-extrabold mb-6 text-gray-900">
          {this.state.count}
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={this.decrement}
            className="px-6 py-3 bg-red-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
          >
            Зменшити
          </button>
          <button
            onClick={this.reset}
            className="px-6 py-3 bg-gray-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
          >
            Скинути
          </button>
          <button
            onClick={this.increment}
            className="px-6 py-3 bg-green-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
          >
            Збільшити
          </button>
        </div>
      </div>
    );
  }
}

// Нова компонента MyEvents (класова, для демонстрації подій)
class MyEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickMessage: "Натисніть кнопку",
      mouseMessage: "Рухайте мишкою над полем",
      cutCopyMessage: "Спробуйте вирізати/скопіювати текст",
      wheelMessage: "Прокрутіть колесо миші над полем",
      mouseX: 0,
      mouseY: 0,
      mouseDown: false,
    };

    // Прив'язка контексту 'this' до методів
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleCut = this.handleCut.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
  }

  handleClick() {
    this.setState({ clickMessage: "Кнопку натиснуто!" });
    setTimeout(() => this.setState({ clickMessage: "Натисніть кнопку" }), 1500);
  }

  handleMouseDown() {
    this.setState({ mouseMessage: "Кнопку миші натиснуто!", mouseDown: true });
  }

  handleMouseUp() {
    this.setState({ mouseMessage: "Кнопку миші відпущено!", mouseDown: false });
  }

  handleMouseMove(event) {
    if (this.state.mouseDown) {
      // Оновлюємо координати лише якщо кнопка миші затиснута
      this.setState({
        mouseX: event.clientX,
        mouseY: event.clientY,
        mouseMessage: `Мишка рухається: X=${event.clientX}, Y=${event.clientY}`,
      });
    }
  }

  handleCut(event) {
    this.setState({ cutCopyMessage: "Текст вирізано!" });
    console.log("Текст вирізано:", event.clipboardData.getData("text"));
    setTimeout(
      () =>
        this.setState({
          cutCopyMessage: "Спробуйте вирізати/скопіювати текст",
        }),
      1500
    );
  }

  handleCopy(event) {
    this.setState({ cutCopyMessage: "Текст скопійовано!" });
    console.log("Текст скопійовано:", event.clipboardData.getData("text"));
    setTimeout(
      () =>
        this.setState({
          cutCopyMessage: "Спробуйте вирізати/скопіювати текст",
        }),
      1500
    );
  }

  handleWheel(event) {
    if (event.deltaY < 0) {
      this.setState({ wheelMessage: "Колесо миші прокручено вгору!" });
    } else {
      this.setState({ wheelMessage: "Колесо миші прокручено вниз!" });
    }
    setTimeout(
      () => this.setState({ wheelMessage: "Прокрутіть колесо миші над полем" }),
      1500
    );
  }

  render() {
    const {
      clickMessage,
      mouseMessage,
      cutCopyMessage,
      wheelMessage,
      mouseX,
      mouseY,
    } = this.state;
    return (
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-4 text-purple-700">
          Демонстрація Подій
        </h2>

        {/* onClick */}
        <div className="mb-4">
          <button
            onClick={this.handleClick}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition-colors"
          >
            Натисни мене (onClick)
          </button>
          <p className="mt-2 text-gray-700">{clickMessage}</p>
        </div>

        {/* onMouseDown, onMouseUp, onMouseMove */}
        <div
          className="bg-gray-100 border border-gray-300 p-4 rounded-lg mb-4 cursor-pointer"
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
          onWheel={this.handleWheel} // onMouseWheel тепер onWheel
        >
          <p className="text-gray-700">{mouseMessage}</p>
          <p className="text-sm text-gray-500">
            Координати миші (лише при натисканні): X={mouseX}, Y={mouseY}
          </p>
          <p className="text-gray-700 mt-2">{wheelMessage}</p>
        </div>

        {/* onCut, onCopy */}
        <div className="mb-4">
          <input
            type="text"
            defaultValue="Спробуйте вирізати або скопіювати цей текст"
            onCut={this.handleCut}
            onCopy={this.handleCopy}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p className="mt-2 text-gray-700">{cutCopyMessage}</p>
        </div>
      </div>
    );
  }
}

export default App;
