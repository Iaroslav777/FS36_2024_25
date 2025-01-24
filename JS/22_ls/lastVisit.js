document.addEventListener("DOMContentLoaded", () => {
  const lastVisitElement = document.getElementById("last-visit");
  const lastVisit = localStorage.getItem("lastVisit");
  const now = new Date().toLocaleString();

  if (lastVisit) {
    lastVisitElement.textContent = `Ваш останній вхід був: ${lastVisit}`;
  } else {
    lastVisitElement.textContent = "Це ваш перший візит.";
  }

  localStorage.setItem("lastVisit", now);
});
