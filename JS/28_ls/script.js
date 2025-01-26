// Завдання 1: Навігація між категоріями
document
  .getElementById("usersLink")
  .addEventListener("click", () => loadUsers());
document
  .getElementById("postsLink")
  .addEventListener("click", () => loadPosts());
document
  .getElementById("commentsLink")
  .addEventListener("click", () => loadComments());

const content = document.getElementById("content");

// Завдання 2: Вивести список юзерів через fetch та XHR
function loadUsers() {
  content.innerHTML = "<p>Завантаження юзерів...</p>";
  fetchData("https://jsonplaceholder.typicode.com/users", renderUsers);
  fetchXHR("https://jsonplaceholder.typicode.com/users", renderUsers);
}

// Завдання 3: Вивести список постів через fetch та XHR
function loadPosts() {
  content.innerHTML = "<p>Завантаження постів...</p>";
  fetchData("https://jsonplaceholder.typicode.com/posts", renderPosts);
  fetchXHR("https://jsonplaceholder.typicode.com/posts", renderPosts);
}

// Завдання 4: Вивести список коментарів через fetch та XHR
function loadComments() {
  content.innerHTML = "<p>Завантаження коментарів...</p>";
  fetchData("https://jsonplaceholder.typicode.com/comments", renderComments);
  fetchXHR("https://jsonplaceholder.typicode.com/comments", renderComments);
}

// Функція для завантаження даних через fetch
function fetchData(url, callback) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(`Дані з fetch (${url}):`, data);
      callback(data);
    })
    .catch((error) => console.error("Помилка fetch:", error));
}

// Функція для завантаження даних через XMLHttpRequest
function fetchXHR(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      console.log(`Дані з XHR (${url}):`, data);
      callback(data);
    } else {
      console.error("Помилка XHR:", xhr.statusText);
    }
  };
  xhr.onerror = function () {
    console.error("Помилка XHR запиту.");
  };
  xhr.send();
}

// Рендеринг списків
function renderUsers(users) {
  content.innerHTML = users
    .map(
      (user) =>
        `<div class="item">
          <h3>${user.name}</h3>
          <p>Email: ${user.email}</p>
          <p>Phone: ${user.phone}</p>
        </div>`
    )
    .join("");
}

function renderPosts(posts) {
  content.innerHTML = posts
    .slice(0, 10) // Лише перші 10 постів
    .map(
      (post) =>
        `<div class="item">
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        </div>`
    )
    .join("");
}

function renderComments(comments) {
  content.innerHTML = comments
    .slice(0, 10) // Лише перші 10 коментарів
    .map(
      (comment) =>
        `<div class="item">
          <h3>${comment.name}</h3>
          <p>${comment.body}</p>
          <p><em>by ${comment.email}</em></p>
        </div>`
    )
    .join("");
}

// Приклад використання call, apply, bind
function logData(data) {
  console.log(this.message, data);
}

const logFetchData = logData.bind({ message: "Дані з fetch:" });
const logXHRData = logData.bind({ message: "Дані з XHR:" });

logFetchData("Тестові дані для fetch");
logXHRData("Тестові дані для XHR");
