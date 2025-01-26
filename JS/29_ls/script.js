// Навігація між сторінками
document
  .getElementById("usersLink")
  .addEventListener("click", () => loadPage("users"));
document
  .getElementById("postsLink")
  .addEventListener("click", () => loadPage("posts"));
document
  .getElementById("commentsLink")
  .addEventListener("click", () => loadPage("comments"));

const content = document.getElementById("content");

// Завантаження сторінок
function loadPage(page) {
  content.innerHTML = `
    <div class="form-group">
      <div class="input-container">
        <input type="number" id="inputId" placeholder="Введіть ID ${page}" />
        <button id="sendButton">Send</button>
      </div>
    </div>
    <div id="result"></div>
  `;

  const sendButton = document.getElementById("sendButton");
  sendButton.addEventListener("click", () => {
    const id = document.getElementById("inputId").value;
    if (!id) {
      alert("Введіть ID");
      return;
    }
    if (page === "users") loadUser(id);
    else if (page === "posts") loadPost(id);
    else if (page === "comments") loadComment(id);
  });
}

// Завдання 2: Завантаження користувача через fetch та XHR
function loadUser(id) {
  fetchData(`https://jsonplaceholder.typicode.com/users/${id}`, renderUser);
  fetchXHR(`https://jsonplaceholder.typicode.com/users/${id}`, renderUser);
}

// Завдання 3: Завантаження поста через fetch та XHR
function loadPost(id) {
  fetchData(`https://jsonplaceholder.typicode.com/posts/${id}`, renderPost);
  fetchXHR(`https://jsonplaceholder.typicode.com/posts/${id}`, renderPost);
}

// Завдання 4: Завантаження коментаря через fetch та XHR
function loadComment(id) {
  fetchData(
    `https://jsonplaceholder.typicode.com/comments/${id}`,
    renderComment
  );
  fetchXHR(
    `https://jsonplaceholder.typicode.com/comments/${id}`,
    renderComment
  );
}

// Завантаження через fetch
function fetchData(url, callback) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => callback(data))
    .catch((error) => console.error("Помилка fetch:", error));
}

// Завантаження через XMLHttpRequest
function fetchXHR(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      callback(data);
    } else {
      console.error("Помилка XHR:", xhr.statusText);
    }
  };
  xhr.send();
}

// Рендеринг результатів
function renderUser(user) {
  const result = document.getElementById("result");
  result.innerHTML = `
    <div class="item">
      <h3>${user.name}</h3>
      <p>Email: ${user.email}</p>
      <p>Phone: ${user.phone}</p>
    </div>
  `;
}

function renderPost(post) {
  const result = document.getElementById("result");
  result.innerHTML = `
    <div class="item">
      <h3>${post.title}</h3>
      <p>${post.body}</p>
    </div>
  `;
}

function renderComment(comment) {
  const result = document.getElementById("result");
  result.innerHTML = `
    <div class="item">
      <h3>${comment.name}</h3>
      <p>${comment.body}</p>
      <p><em>by ${comment.email}</em></p>
    </div>
  `;
}

// Завдання 5: Приклад застосування call, apply, bind
class Greeter {
  constructor(greeting) {
    this.greeting = greeting;
  }

  greet(name) {
    console.log(`${this.greeting}, ${name}!`);
  }
}

const greeter = new Greeter("Привіт");

// Використання bind
const greetJohn = greeter.greet.bind(greeter, "John");
greetJohn(); // "Привіт, John!"

// Використання call
greeter.greet.call(greeter, "Jane"); // "Привіт, Jane!"

// Використання apply
greeter.greet.apply(greeter, ["Mary"]); // "Привіт, Mary!"
