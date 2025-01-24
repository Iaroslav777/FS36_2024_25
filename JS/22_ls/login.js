document.addEventListener("DOMContentLoaded", () => {
  const welcomeMessage = document.getElementById("welcome-message");
  const username = sessionStorage.getItem("username");

  if (!username) {
    const name = prompt("Введіть ваше ім'я:");
    const password = prompt("Введіть пароль:");

    if (name && password) {
      sessionStorage.setItem("username", name);
      welcomeMessage.textContent = `Привіт, ${name}`;
    }
  } else {
    welcomeMessage.textContent = `Привіт, ${username}`;
  }
});
