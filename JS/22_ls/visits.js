document.addEventListener("DOMContentLoaded", () => {
  const visitCountElement = document.getElementById("visit-count");
  let visitCount = localStorage.getItem("visitCount") || 0;
  visitCount++;
  localStorage.setItem("visitCount", visitCount);
  visitCountElement.textContent = `Ви відвідали цю сторінку ${visitCount} разів.`;
});
