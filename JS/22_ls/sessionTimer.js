document.addEventListener("DOMContentLoaded", () => {
  const sessionTimerElement = document.getElementById("session-timer");
  const sessionStart = sessionStorage.getItem("sessionStart") || Date.now();
  sessionStorage.setItem("sessionStart", sessionStart);

  const updateTimer = () => {
    const elapsed = Math.floor((Date.now() - sessionStart) / 1000);
    sessionTimerElement.textContent = `${elapsed} секунд`;
  };

  setInterval(updateTimer, 1000);
  updateTimer();
});
