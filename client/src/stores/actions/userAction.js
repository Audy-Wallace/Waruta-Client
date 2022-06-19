import { BASE_URL } from "./actionType";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
const MySwal = withReactContent(Swal);

export const login = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: `${BASE_URL}/users/login`,
        data: {
          email: user.email,
          password: user.password,
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

export const register = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: `${BASE_URL}/users/register`,
        data: {
          username: user.username,
          email: user.email,
          password: user.password,
          imgUrl: user.imgUrl,
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
