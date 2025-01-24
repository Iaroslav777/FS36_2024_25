// Зміна стилю елементу
document.getElementById("changeStyle").addEventListener("click", () => {
  const text = document.getElementById("text");
  text.style.color = "blue";
  text.style.fontSize = "20px";
});

// Зміна текстового вмісту
document.getElementById("changeText").addEventListener("click", () => {
  document.getElementById("text").textContent = "Новий текст";
});

// Додавання нового елементу
document.getElementById("addElement").addEventListener("click", () => {
  for (let i = 1; i <= 3; i++) {
    const newElement = document.createElement("p");
    newElement.textContent = `Новий елемент ${i}`;
    document.body.append(newElement);
  }
});

// Видалення елементу
document.getElementById("removeElements").addEventListener("click", () => {
  const list = document.getElementById("list");
  if (list.firstChild) list.removeChild(list.firstChild);
});

// Зміна атрибутів
document.getElementById("link").setAttribute("href", "https://google.com");

// Сортування списку
document.getElementById("sortList").addEventListener("click", () => {
  const list = document.getElementById("list");
  const items = Array.from(list.children);
  items.sort((a, b) => a.textContent.localeCompare(b.textContent));
  items.forEach((item) => list.appendChild(item));
});

// Зміна порядку елементів (реверс)
document.getElementById("reverseList").addEventListener("click", () => {
  const list = document.getElementById("list");
  const items = Array.from(list.children);
  items.reverse().forEach((item) => list.appendChild(item));
});

// Видалення дочірніх елементів
const parent = document.getElementById("parent");
while (parent.firstChild) {
  parent.removeChild(parent.firstChild);
}

// Зміна класів
document.getElementById("text").classList.add("highlight");

// Зміна HTML-структури
const newDiv = document.createElement("div");
newDiv.innerHTML = "<p>Новий внутрішній елемент</p>";
document.body.appendChild(newDiv);
