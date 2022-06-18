import { GET_WORDS_SINGLEPLAYER_ACTION } from "./actionTypes";
import axios from "axios";
function getWordsSingleplayer(payload, solution) {
  return {
    type: GET_WORDS_SINGLEPLAYER_ACTION,
    payload,
    solution,
  };
}
export function fetchWords() {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3000/words");
      const payload = response.data;
      const random = Math.floor(Math.random() * payload.length);
      const index = localStorage.getItem("index")
        ? localStorage.getItem("index")
        : localStorage.setItem("index", random);
      const solution = payload[index];
      dispatch(getWordsSingleplayer(payload, solution));
    } catch (error) {
      console.log(error);
    }
  };
}
