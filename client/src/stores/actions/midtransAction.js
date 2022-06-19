import axios from "axios";
import { BASE_URL } from "./actionType";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export function finishOrder() {
  return async (dispatch) => {
    try {
      const { data: response } = await axios.get(`${BASE_URL}/users/midtrans`, {
        headers: {
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjU1NjMzNzQwfQ.tsBIzjBtSoA2x9DHDXZ7kqDqjP-RXizp9XlopB5Eiuw",
        },
      });

      return response;
    } catch (error) {
      MySwal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };
}

export function updatePremium() {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/users/premium`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjU1NjMzNzQwfQ.tsBIzjBtSoA2x9DHDXZ7kqDqjP-RXizp9XlopB5Eiu",
        },
      });

      if (!response.ok) {
        return await response.json().then((err) => {
          throw err;
        });
      }
    } catch (error) {
      MySwal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };
}
