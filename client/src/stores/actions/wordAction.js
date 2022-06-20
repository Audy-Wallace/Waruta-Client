import { GET_WORDS, BASE_URL } from "./actionType";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export function fetchWords() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL}/words`);

      const words = response.data;

      const random = Math.floor(Math.random() * words.length);

      const index = localStorage.getItem("index")
        ? localStorage.getItem("index")
        : localStorage.setItem("index", random);

      const solution = words[index];

      dispatch({
        type: GET_WORDS,
        payload: { words, solution },
      });
    } catch (error) {
      MySwal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };
}
