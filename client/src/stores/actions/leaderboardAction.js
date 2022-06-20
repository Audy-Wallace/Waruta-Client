import { BASE_URL, GET_LEADERBOARD } from "./actionType";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
const MySwal = withReactContent(Swal);

export const fetchLeaderboard = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `${BASE_URL}/leaderboard`,
      });

      dispatch({
        type: GET_LEADERBOARD,
        payload: data,
      });
    } catch (error) {
      MySwal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };
};

export const makeLeaderboard = (data) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: `${BASE_URL}/leaderboard`,
        data: {
          time: data.time,
          guess: data.guess,
          score: data.score,
        },
      });

      return data;
    } catch (error) {
      MySwal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };
};
