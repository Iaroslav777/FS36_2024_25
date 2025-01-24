// Зміна кольору другого куба при кліку на перший
const firstCube = document.getElementById("first-cube");
const secondCube = document.getElementById("second-cube");
firstCube.addEventListener("click", () => {
  const randomColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  })`;
  secondCube.style.backgroundColor = randomColor;
});

// Заборона копіювання тексту
const textBlock = document.getElementById("text-block");
textBlock.addEventListener("copy", (event) => {
  event.preventDefault();
  alert("Текст неможливо скопіювати!!");
});

// Куб змінює колір залежно від координат
const colorCube = document.getElementById("color-cube");
window.addEventListener("mousemove", (event) => {
  const r = event.clientX % 256;
  const g = event.clientY % 256;
  const b = ((event.clientX + event.clientY) / 2) % 256;
  colorCube.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
});

// Виведення інформації про куб у консоль
const outerCube = document.getElementById("outer-cube");
const middleCube = document.getElementById("middle-cube");
const innerCube = document.getElementById("inner-cube");
outerCube.addEventListener("click", () => console.log("Outer Cube Clicked"));
middleCube.addEventListener("click", () => console.log("Middle Cube Clicked"));
innerCube.addEventListener("click", () => console.log("Inner Cube Clicked"));

// Зупинка виконання івентів
const outerCube2 = document.getElementById("outer-cube-2");
const middleCube2 = document.getElementById("middle-cube-2");
const innerCube2 = document.getElementById("inner-cube-2");
outerCube2.addEventListener(
  "click",
  () => console.log("Outer Cube Clicked (Task 5)"),
  true
);
middleCube2.addEventListener("click", (event) => {
  console.log("Middle Cube Clicked (Task 5)");
  event.stopPropagation();
});
innerCube2.addEventListener("click", () =>
  console.log("Inner Cube Clicked (Task 5)")
);

// Робота з формою
const form = document.getElementById("test-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const formObject = Object.fromEntries(formData.entries());
  console.log("Form Data:", formObject);
});
