document.addEventListener("DOMContentLoaded", () => {
  const todoListElement = document.getElementById("todo-list");
  const addTaskButton = document.getElementById("add-task");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const renderTasks = () => {
    todoListElement.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.textContent = `${task.title} (${task.date}) - ${
        task.isDone ? "Виконано" : "Не виконано"
      }`;
      li.addEventListener("click", () => {
        task.isDone = !task.isDone;
        saveTasks();
        renderTasks();
      });
      todoListElement.appendChild(li);
    });
  };

  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  addTaskButton.addEventListener("click", () => {
    const title = prompt("Введіть назву завдання:");
    const date = prompt("Введіть дату завдання:");
    const describe = prompt("Опис завдання:");

    if (title && date) {
      tasks.push({ title, date, describe, isDone: false });
      saveTasks();
      renderTasks();
    }
  });

  renderTasks();
});
