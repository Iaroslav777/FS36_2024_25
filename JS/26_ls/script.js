// Завдання 1: Створити промпт, при заповненні якого вас перенаправляє на сайт, введений у промпті
const userUrl = prompt(
  "Введіть URL сайту (наприклад, https://www.google.com):"
);
if (userUrl) {
  window.location.href = userUrl; // Перенаправлення на введений сайт
}

// Завдання 2: Створити функцію, яка буде показувати на екрані геолокацію та URL шлях сайту
function showGeoAndUrl() {
  const currentUrl = window.location.href; // Поточний URL
  console.log(`URL сайту: ${currentUrl}`);
  alert(`URL сайту: ${currentUrl}`);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(
          `Ваша геолокація: широта ${latitude}, довгота ${longitude}`
        );
        alert(`Ваша геолокація: широта ${latitude}, довгота ${longitude}`);
      },
      (error) => {
        console.error("Не вдалося отримати геолокацію", error);
        alert("Не вдалося отримати геолокацію");
      }
    );
  } else {
    console.error("Геолокація не підтримується вашим браузером.");
    alert("Геолокація не підтримується вашим браузером.");
  }
}
// Виклик функції для показу URL і геолокації
showGeoAndUrl();

// Завдання 3: Створити стрім із мікрофона та відео
async function startStream() {
  const videoElement = document.createElement("video");
  videoElement.autoplay = true; // Автоматично відтворювати стрім
  videoElement.style.width = "100%";
  videoElement.style.maxWidth = "600px";
  document.body.appendChild(videoElement); // Додаємо відео на сторінку

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    videoElement.srcObject = stream; // Підключаємо стрім до відео
  } catch (error) {
    console.error("Не вдалося отримати доступ до медіа-стріму", error);
    alert("Не вдалося отримати доступ до мікрофона та камери.");
  }
}
// Виклик функції для початку стріму
startStream();
