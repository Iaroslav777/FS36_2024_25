// Отримуємо елементи
const inputName = document.getElementById("inputName");
const inputAge = document.getElementById("inputAge");
const addButton = document.getElementById("addButton");
const userList = document.getElementById("userList");

// Список користувачів
const users = [];

// Додавання нового користувача
addButton.addEventListener("click", () => {
  const name = inputName.value.trim();
  const age = parseInt(inputAge.value.trim(), 10);

  // Перевірка на валідність
  if (!name || isNaN(age) || age <= 0) {
    alert("Введіть коректні ім'я та вік!");
    return;
  }

  // Додавання до списку
  const user = { name, age };
  users.push(user);
  renderUsers();

  // Очищення полів
  inputName.value = "";
  inputAge.value = "";
});

// Рендеринг списку
function renderUsers() {
  userList.innerHTML = ""; // Очищуємо список
  users.forEach((user, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${user.name} (${user.age} років)</span>`;
    const removeButton = document.createElement("button");
    removeButton.textContent = "Видалити";
    removeButton.classList.add("remove-btn");

    // Видалення користувача
    removeButton.addEventListener("click", () => {
      users.splice(index, 1);
      renderUsers();
    });

    li.appendChild(removeButton);
    userList.appendChild(li);
  });
}
