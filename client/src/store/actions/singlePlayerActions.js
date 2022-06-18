import { GET_WORDS_SINGLEPLAYER_ACTION } from "./actionTypes";
import axios from "axios";
function getWordsSingleplayer(payload) {
  return {
    type: GET_WORDS_SINGLEPLAYER_ACTION,
    payload,
  };
}
export function fetchWords() {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3000/words");
      const payload = response.data;
      dispatch(getWordsSingleplayer(payload));
    } catch (error) {
      console.log(error);
    }
  };
}
