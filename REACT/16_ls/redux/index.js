import { createStore } from "redux";

// --- Типи дій ---
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const ADD_TEN = "ADD_TEN";
export const SUBTRACT_TEN = "SUBTRACT_TEN";
export const DIVIDE_BY_TWO = "DIVIDE_BY_TWO";
export const SET_ZERO = "SET_ZERO";
export const SET_HUNDRED = "SET_HUNDRED";

// --- Генератори дій (Action Creators) ---
export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});

export const addTen = () => ({
  type: ADD_TEN,
});

export const subtractTen = () => ({
  type: SUBTRACT_TEN,
});

export const divideByTwo = () => ({
  type: DIVIDE_BY_TWO,
});

export const setZero = () => ({
  type: SET_ZERO,
});

export const setHundred = () => ({
  type: SET_HUNDRED,
});

// --- Редьюсер ---
// Початковий стан лічильника
const initialState = {
  count: 0,
};

// Редьюсер - чиста функція, яка приймає поточний стан та дію,
// і повертає новий стан
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    case ADD_TEN:
      return {
        ...state,
        count: state.count + 10,
      };
    case SUBTRACT_TEN:
      return {
        ...state,
        count: state.count - 10,
      };
    case DIVIDE_BY_TWO:
      // Заокруглюємо число до найближчого цілого
      return {
        ...state,
        count: Math.round(state.count / 2),
      };
    case SET_ZERO:
      return {
        ...state,
        count: 0,
      };
    case SET_HUNDRED:
      return {
        ...state,
        count: 100,
      };
    default:
      // Повертаємо поточний стан, якщо дія невідома
      return state;
  }
}

// --- Redux Store ---
// Створюємо Redux Store, передаючи йому редьюсер
const store = createStore(counterReducer);

export default store;
