import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk"; // Імпортуємо redux-thunk

// --- Типи дій ---
// Користувачі
export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

// Пости
export const FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";

// Коментарі
export const FETCH_COMMENTS_REQUEST = "FETCH_COMMENTS_REQUEST";
export const FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS";
export const FETCH_COMMENTS_FAILURE = "FETCH_COMMENTS_FAILURE";

// --- Генератори дій (Action Creators) ---
// Користувачі
export const fetchUsersRequest = () => ({ type: FETCH_USERS_REQUEST });
export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});
export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

// Пости
export const fetchPostsRequest = () => ({ type: FETCH_POSTS_REQUEST });
export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts,
});
export const fetchPostsFailure = (error) => ({
  type: FETCH_POSTS_FAILURE,
  payload: error,
});

// Коментарі
export const fetchCommentsRequest = () => ({ type: FETCH_COMMENTS_REQUEST });
export const fetchCommentsSuccess = (comments) => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: comments,
});
export const fetchCommentsFailure = (error) => ({
  type: FETCH_COMMENTS_FAILURE,
  payload: error,
});

// --- Thunks (Асинхронні дії) ---
import * as api from "../services/api"; // Імпортуємо всі функції API

export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(fetchUsersRequest());
    try {
      const users = await api.fetchAllUsers();
      dispatch(fetchUsersSuccess(users));
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
    }
  };
};

export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch(fetchPostsRequest());
    try {
      const posts = await api.fetchAllPosts();
      dispatch(fetchPostsSuccess(posts));
    } catch (error) {
      dispatch(fetchPostsFailure(error.message));
    }
  };
};

export const fetchComments = () => {
  return async (dispatch) => {
    dispatch(fetchCommentsRequest());
    try {
      const comments = await api.fetchAllComments();
      dispatch(fetchCommentsSuccess(comments));
    } catch (error) {
      dispatch(fetchCommentsFailure(error.message));
    }
  };
};

// --- Редьюсери ---
// Редьюсер для користувачів
const initialUsersState = {
  items: [],
  loading: false,
  error: null,
};

function usersReducer(state = initialUsersState, action) {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, items: action.payload };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload, items: [] };
    default:
      return state;
  }
}

// Редьюсер для постів
const initialPostsState = {
  items: [],
  loading: false,
  error: null,
};

function postsReducer(state = initialPostsState, action) {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_POSTS_SUCCESS:
      return { ...state, loading: false, items: action.payload };
    case FETCH_POSTS_FAILURE:
      return { ...state, loading: false, error: action.payload, items: [] };
    default:
      return state;
  }
}

// Редьюсер для коментарів
const initialCommentsState = {
  items: [],
  loading: false,
  error: null,
};

function commentsReducer(state = initialCommentsState, action) {
  switch (action.type) {
    case FETCH_COMMENTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_COMMENTS_SUCCESS:
      return { ...state, loading: false, items: action.payload };
    case FETCH_COMMENTS_FAILURE:
      return { ...state, loading: false, error: action.payload, items: [] };
    default:
      return state;
  }
}

// Комбінуємо всі редьюсери в один кореневий редьюсер
const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer,
});

// --- Redux Store ---
// Створюємо Redux Store, застосовуючи middleware Thunk
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
