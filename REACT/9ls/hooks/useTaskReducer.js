import { useReducer } from "react";

// Редьюсер для керування станом списку завдань
function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return [
        ...state,
        {
          id: Date.now(), // Простий унікальний ID
          text: action.payload.text,
          category: action.payload.category,
          completed: false,
        },
      ];
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
    case "TOGGLE_TASK":
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    default:
      throw new Error(`Невідомий тип дії: ${action.type}`);
  }
}

// Кастомний хук useTaskReducer для управління завданнями
function useTaskReducer(initialTasks) {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  return [tasks, dispatch];
}

export default useTaskReducer;
