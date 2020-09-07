import { CREATE_POST } from "./types";
import { showAlert } from "./actions/appActions";

const spamWords = ["fck", "sht", "spam"];

export const filterSpamWords = ({ dispatch }) => {
  return (next) => {
    return (action) => {
      if (action.type === CREATE_POST) {
        const found = spamWords.filter((word) =>
          action.payload.title.includes(word)
        );
        if (found.length)
          return dispatch(
            showAlert("Your title is not correct for our resource")
          );
      }
      return next(action);
    };
  };
};
