import { CREATE_POST, FETCH_POSTS } from "../types";
import { showLoader, hideLoader, showAlert } from "./appActions";

export const createPost = (post) => {
  return {
    type: CREATE_POST,
    payload: post,
  };
};

export const fetchPosts = () => {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=5"
      );
      const json = await response.json();
      // emulation long loading data from API for test Loader
      setTimeout(() => {
        dispatch({ type: FETCH_POSTS, payload: json });
        dispatch(hideLoader());
      }, 500);
    } catch (e) {
      dispatch(showAlert("Something went wrong"));
      dispatch(hideLoader());
    }
  };
};
