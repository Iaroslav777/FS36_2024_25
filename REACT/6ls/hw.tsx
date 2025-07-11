import React, { Component } from "react";

// --- Інтерфейси та Енамки ---

// Енам для статусу завантаження даних
enum LoadingStatus {
  Idle = "idle",
  Loading = "loading",
  Succeeded = "succeeded",
  Failed = "failed",
}

// Інтерфейс для даних заголовка
interface HeaderData {
  title: string;
  description: string;
  version: string;
}

// Інтерфейс для пропсів компонента Header
interface HeaderProps {
  data: HeaderData;
}

// Інтерфейс для даних футера
interface FooterData {
  text: string;
  author?: string; // Додано опціональне поле для автора
}

// Інтерфейс для пропсів компонента Footer
interface FooterProps {
  data: FooterData;
}

// Інтерфейс для даних бічної панелі
interface SidebarData {
  menuItems: string[];
  isOpen: boolean;
  info: string;
}

// Інтерфейс для пропсів компонента Sidebar
interface SidebarProps {
  data: SidebarData;
}

// Інтерфейс для даних, що завантажуються з бекенду (наприклад, пост з JSONPlaceholder)
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Інтерфейс для стану компонента Content (тепер OldContent)
interface ContentState {
  posts: Post[];
  loadingStatus: LoadingStatus;
  error: string | null;
}

// Інтерфейс для стану компонента Count
interface CountState {
  count: number;
}

// Інтерфейс для стану компонента MyEvents
interface MyEventsState {
  clickMessage: string;
  mouseMessage: string;
  cutCopyMessage: string;
  wheelMessage: string;
  mouseX: number;
  mouseY: number;
  mouseDown: boolean;
}

// Інтерфейс для пропсів Wrapper
interface WrapperProps {}

// Інтерфейс для стану Wrapper
interface WrapperState {
  showNavbar: boolean;
  showContent1: boolean;
  showOldContent: boolean;
  showSidebar: boolean;
  showHeader: boolean;
  showFooter: boolean;
}

// Інтерфейс для пропсів Navbar
interface NavbarProps {
  activeTab: string;
}

// Інтерфейс для стану Navbar
interface NavbarState {
  message: string;
  loadTime: number;
}

// Інтерфейс для пропсів Content1
interface Content1Props {}

// Інтерфейс для стану Content1
interface Content1State {
  counter: number;
  bgColor: string;
}

// --- Компоненти ---

// Головний компонент додатку (класовий)
class App extends Component {
  render() {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
        {/* Wrapper тепер є головним контейнером для умовного рендерингу */}
        <Wrapper />
      </div>
    );
  }
}

// Класова компонента Wrapper, яка керує умовним рендерингом
class Wrapper extends Component<WrapperProps, WrapperState> {
  constructor(props: WrapperProps) {
    super(props);
    this.state = {
      showNavbar: false,
      showContent1: false,
      showOldContent: true, // За замовчуванням показуємо контент з попереднього ДЗ
      showSidebar: true,
      showHeader: true,
      showFooter: true,
    };
  }

  // Допоміжна функція для перемикання видимості компонента
  toggleComponent = (componentName: keyof WrapperState) => {
    this.setState((prevState) => ({
      [componentName]: !prevState[componentName],
    }));
  };

  render() {
    const {
      showNavbar,
      showContent1,
      showOldContent,
      showSidebar,
      showHeader,
      showFooter,
    } = this.state;

    // Дані для Header, Footer, Sidebar
    const headerData: HeaderData = {
      title: "Привіт з Заголовка!",
      description: "Це верхня частина нашої сторінки.",
      version: "1.0",
    };

    const footerData: FooterData = {
      text: "© 2025 Домашнє Завдання 6.",
      author: "Бабік Ярослав", // Ім'я автора для ДЗ 5
    };

    const sidebarData: SidebarData = {
      menuItems: ["Головна", "Про нас", "Послуги", "Контакти"],
      isOpen: true,
      info: "Бічна панель з навігацією.",
    };

    return (
      <div className="flex flex-col w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Кнопки перемикання видимості компонентів */}
        <div className="p-4 bg-gray-200 flex flex-wrap justify-center gap-2 rounded-t-lg">
          <button
            onClick={() => this.toggleComponent("showHeader")}
            className="px-3 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors"
          >
            {showHeader ? "Приховати" : "Показати"} Header
          </button>
          <button
            onClick={() => this.toggleComponent("showFooter")}
            className="px-3 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors"
          >
            {showFooter ? "Приховати" : "Показати"} Footer
          </button>
          <button
            onClick={() => this.toggleComponent("showSidebar")}
            className="px-3 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors"
          >
            {showSidebar ? "Приховати" : "Показати"} Sidebar
          </button>
          <button
            onClick={() => this.toggleComponent("showNavbar")}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            {showNavbar ? "Приховати" : "Показати"} Navbar
          </button>
          <button
            onClick={() => this.toggleComponent("showContent1")}
            className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            {showContent1 ? "Приховати" : "Показати"} Content1
          </button>
          <button
            onClick={() => this.toggleComponent("showOldContent")}
            className="px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
          >
            {showOldContent ? "Приховати" : "Показати"} Old Content
          </button>
        </div>

        <div className="flex flex-col md:flex-row flex-grow">
          {/* Sidebar */}
          {showSidebar && (
            <div className="w-full md:w-1/4 bg-blue-600 text-white p-4">
              <Sidebar data={sidebarData} />
            </div>
          )}

          <div
            className={`flex flex-col ${showSidebar ? "md:w-3/4" : "w-full"}`}
          >
            {/* Header */}
            {showHeader && (
              <div className="w-full bg-blue-500 text-white p-4">
                <Header data={headerData} />
              </div>
            )}

            {/* Основна область контенту */}
            <div className="flex-grow p-6 bg-gray-50 overflow-y-auto">
              {/* Умовний рендеринг основних компонентів */}
              {showNavbar && <Navbar activeTab="Головна" />}
              {showContent1 && <Content1 />}
              {showOldContent && <OldContent />}
            </div>

            {/* Footer */}
            {showFooter && (
              <div className="w-full bg-gray-800 text-white p-4 rounded-b-lg">
                <Footer data={footerData} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

// Компонент Header (класовий, типізований)
class Header extends Component<HeaderProps> {
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

// Компонент Footer (класовий, типізований)
class Footer extends Component<FooterProps> {
  render() {
    const { data } = this.props;
    return (
      <footer className="text-center text-sm">
        <p className="mb-1">{data.text}</p>
        {data.author && <p>Автор: {data.author}</p>}{" "}
        {/* Виводимо автора, якщо він існує */}
      </footer>
    );
  }
}

// Компонент Sidebar (класовий, типізований, з демонстрацією умовного рендерингу)
class Sidebar extends Component<SidebarProps> {
  render() {
    const { data } = this.props;
    return (
      <aside className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Навігація</h2>
        {/* Умовний рендеринг: показуємо меню, якщо isOpen true */}
        {data.isOpen ? (
          <ul className="space-y-2">
            {data.menuItems.map((item: string, index: number) => (
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

// Компонент OldContent (класовий, типізований, з демонстрацією інтерполяції, лічильника, подій та запитів на бекенд)
// Це колишній компонент Content з попереднього ДЗ, перейменований для уникнення конфліктів
class OldContent extends Component<{}, ContentState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      posts: [],
      loadingStatus: LoadingStatus.Idle,
      error: null,
    };
    this.contentInfo = {
      title: "Ласкаво просимо до нашого додатку!",
      describe:
        "Тут ви знайдете цікавий контент та інтерактивні елементи. Цей розділ демонструє виведення даних, роботу лічильника, обробку подій та завантаження даних з бекенду.",
    };
  }

  contentInfo: { title: string; describe: string };

  async componentDidMount() {
    this.setState({ loadingStatus: LoadingStatus.Loading });
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=5"
      );
      if (!response.ok) {
        throw new Error(`HTTP помилка! Статус: ${response.status}`);
      }
      const data: Post[] = await response.json();
      this.setState({
        posts: data,
        loadingStatus: LoadingStatus.Succeeded,
        error: null,
      });
    } catch (error: any) {
      this.setState({
        loadingStatus: LoadingStatus.Failed,
        error: error.message || "Невідома помилка при завантаженні постів",
      });
      console.error("Помилка завантаження постів:", error);
    }
  }

  render() {
    const { posts, loadingStatus, error } = this.state;

    return (
      <main className="text-gray-800">
        <h1 className="text-4xl font-bold mb-4 text-center">
          {this.contentInfo.title}
        </h1>
        <p className="text-lg leading-relaxed mb-8 text-center">
          {this.contentInfo.describe}
        </p>

        {/* Секція запитів на бекенд */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center w-full max-w-lg mx-auto mb-8">
          <h2 className="text-3xl font-semibold mb-4 text-blue-700">
            Дані з Бекенду (JSONPlaceholder)
          </h2>
          {loadingStatus === LoadingStatus.Loading && (
            <p className="text-blue-500">Завантаження даних...</p>
          )}
          {loadingStatus === LoadingStatus.Failed && (
            <p className="text-red-500">Помилка: {error}</p>
          )}
          {loadingStatus === LoadingStatus.Succeeded && (
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-2">Останні пости:</h3>
              <ul className="list-disc list-inside space-y-2">
                {posts.map((post: Post) => (
                  <li key={post.id} className="text-gray-700">
                    <strong className="text-blue-600">{post.title}</strong>:{" "}
                    {post.body.substring(0, 50)}...
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center mt-8 space-y-8">
          <Count />
          <MyEvents /> {/* Компонента для демонстрації подій */}
        </div>
      </main>
    );
  }
}

// Компонент Count (класовий лічильник, типізований)
class Count extends Component<{}, CountState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      count: 0,
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }

  increment(): void {
    this.setState((prevState: CountState) => ({
      count: prevState.count + 1,
    }));
  }

  decrement(): void {
    this.setState((prevState: CountState) => ({
      count: prevState.count - 1,
    }));
  }

  reset(): void {
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

// Нова компонента MyEvents (класова, типізована, для демонстрації подій)
class MyEvents extends Component<{}, MyEventsState> {
  constructor(props: {}) {
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

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleCut = this.handleCut.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
  }

  handleClick(): void {
    this.setState({ clickMessage: "Кнопку натиснуто!" });
    setTimeout(() => this.setState({ clickMessage: "Натисніть кнопку" }), 1500);
  }

  handleMouseDown(): void {
    this.setState({ mouseMessage: "Кнопку миші натиснуто!", mouseDown: true });
  }

  handleMouseUp(): void {
    this.setState({ mouseMessage: "Кнопку миші відпущено!", mouseDown: false });
  }

  handleMouseMove(event: React.MouseEvent<HTMLDivElement>): void {
    if (this.state.mouseDown) {
      this.setState({
        mouseX: event.clientX,
        mouseY: event.clientY,
        mouseMessage: `Мишка рухається: X=${event.clientX}, Y=${event.clientY}`,
      });
    }
  }

  handleCut(event: React.ClipboardEvent<HTMLInputElement>): void {
    this.setState({ cutCopyMessage: "Текст вирізано!" });
    setTimeout(
      () =>
        this.setState({
          cutCopyMessage: "Спробуйте вирізати/скопіювати текст",
        }),
      1500
    );
  }

  handleCopy(event: React.ClipboardEvent<HTMLInputElement>): void {
    this.setState({ cutCopyMessage: "Текст скопійовано!" });
    setTimeout(
      () =>
        this.setState({
          cutCopyMessage: "Спробуйте вирізати/скопіювати текст",
        }),
      1500
    );
  }

  handleWheel(event: React.WheelEvent<HTMLDivElement>): void {
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
          onWheel={this.handleWheel}
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

// Нова компонента Navbar (класова, типізована)
class Navbar extends Component<NavbarProps, NavbarState> {
  private timerId: NodeJS.Timeout | undefined;

  constructor(props: NavbarProps) {
    super(props);
    this.state = {
      message: "Navbar ініціалізовано!",
      loadTime: Date.now(),
    };
    console.log("Navbar: constructor - Компонент ініціалізовано.");
  }

  shouldComponentUpdate(
    nextProps: NavbarProps,
    nextState: NavbarState
  ): boolean {
    // Оптимізація: оновлюємо компонент лише якщо змінився activeTab або повідомлення
    if (
      nextProps.activeTab !== this.props.activeTab ||
      nextState.message !== this.state.message
    ) {
      console.log("Navbar: shouldComponentUpdate - Дозволено оновлення.");
      return true;
    }
    console.log("Navbar: shouldComponentUpdate - Оновлення заблоковано.");
    return false;
  }

  componentDidMount(): void {
    console.log("Navbar: componentDidMount - Компонент змонтовано.");
    // Встановлюємо таймер, який оновить повідомлення через 3 секунди
    this.timerId = setTimeout(() => {
      this.setState({ message: "Navbar повністю завантажено!" });
      console.log(
        "Navbar: componentDidMount - Повідомлення оновлено через таймер."
      );
    }, 3000);
  }

  componentDidUpdate(prevProps: NavbarProps, prevState: NavbarState): void {
    console.log("Navbar: componentDidUpdate - Компонент оновлено.");
    // Змінюємо колір фону, якщо activeTab змінився
    if (prevProps.activeTab !== this.props.activeTab) {
      console.log(
        `Navbar: componentDidUpdate - activeTab змінився з ${prevProps.activeTab} на ${this.props.activeTab}`
      );
    }
    if (prevState.message !== this.state.message) {
      console.log(
        `Navbar: componentDidUpdate - Повідомлення змінилося на: ${this.state.message}`
      );
    }
  }

  componentWillUnmount(): void {
    console.log("Navbar: componentWillUnmount - Компонент буде демонтовано.");
    // Очищаємо таймер, щоб уникнути витоків пам'яті
    if (this.timerId) {
      clearTimeout(this.timerId);
      console.log("Navbar: componentWillUnmount - Таймер очищено.");
    }
  }

  render() {
    console.log("Navbar: render - Компонент рендериться.");
    const { activeTab } = this.props;
    const { message, loadTime } = this.state;
    const timeElapsed = ((Date.now() - loadTime) / 1000).toFixed(2);

    return (
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-6 rounded-lg shadow-xl mb-8">
        <h2 className="text-3xl font-bold mb-3">Навігаційна Панель</h2>
        <p className="text-lg mb-2">
          Активна вкладка: <span className="font-semibold">{activeTab}</span>
        </p>
        <p className="text-md opacity-90">{message}</p>
        <p className="text-sm opacity-70">
          Час з моменту завантаження: {timeElapsed} секунд
        </p>
      </div>
    );
  }
}

// Нова компонента Content1 (класова, типізована)
class Content1 extends Component<Content1Props, Content1State> {
  private intervalId: NodeJS.Timeout | undefined;

  constructor(props: Content1Props) {
    super(props);
    this.state = {
      counter: 0,
      bgColor: "bg-yellow-100",
    };
    console.log("Content1: constructor - Компонент ініціалізовано.");
  }

  shouldComponentUpdate(
    nextProps: Content1Props,
    nextState: Content1State
  ): boolean {
    // Оптимізація: оновлюємо компонент лише якщо змінився лічильник або колір фону
    if (
      nextState.counter !== this.state.counter ||
      nextState.bgColor !== this.state.bgColor
    ) {
      console.log("Content1: shouldComponentUpdate - Дозволено оновлення.");
      return true;
    }
    console.log("Content1: shouldComponentUpdate - Оновлення заблоковано.");
    return false;
  }

  componentDidMount(): void {
    console.log("Content1: componentDidMount - Компонент змонтовано.");
    // Запускаємо інтервал, який збільшує лічильник кожну секунду
    this.intervalId = setInterval(() => {
      this.setState((prevState) => {
        const newCounter = prevState.counter + 1;
        let newBgColor = prevState.bgColor;
        if (newCounter % 5 === 0) {
          // Змінюємо відтінок жовтого кожні 5 секунд
          const shade = (Math.floor(newCounter / 5) % 3) * 100 + 100; // 100, 200, 300
          newBgColor = `bg-yellow-${shade}`;
        }
        return { counter: newCounter, bgColor: newBgColor };
      });
      console.log("Content1: componentDidMount - Лічильник оновлено.");
    }, 1000);
  }

  componentDidUpdate(prevProps: Content1Props, prevState: Content1State): void {
    console.log("Content1: componentDidUpdate - Компонент оновлено.");
    // Логуємо зміну лічильника
    if (prevState.counter !== this.state.counter) {
      console.log(
        `Content1: componentDidUpdate - Лічильник змінився на: ${this.state.counter}`
      );
    }
  }

  componentWillUnmount(): void {
    console.log("Content1: componentWillUnmount - Компонент буде демонтовано.");
    // Очищаємо інтервал, щоб уникнути витоків пам'яті
    if (this.intervalId) {
      clearInterval(this.intervalId);
      console.log("Content1: componentWillUnmount - Інтервал очищено.");
    }
  }

  render() {
    console.log("Content1: render - Компонент рендериться.");
    const { counter, bgColor } = this.state;
    const textColor = counter % 2 === 0 ? "text-blue-700" : "text-red-700"; // Зміна кольору тексту

    return (
      <div className={`${bgColor} p-6 rounded-lg shadow-xl text-center mb-8`}>
        <h2 className="text-3xl font-bold mb-3">Динамічний Контент 1</h2>
        <p
          className={`text-6xl font-extrabold ${textColor} transition-colors duration-500`}
        >
          {counter}
        </p>
        <p className="text-lg mt-4">Цей лічильник оновлюється кожну секунду.</p>
        <p className="text-sm opacity-80">
          Колір фону змінюється кожні 5 секунд.
        </p>
      </div>
    );
  }
}

export default App;
