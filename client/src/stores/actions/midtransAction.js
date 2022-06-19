import axios from "axios";

export function finishOrder() {
  return async (dispatch) => {
    try {
      const { data: response } = await axios.get(
        "http://localhost:3000/users/midtrans",
        {
          headers: {
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjU1NjMzNzQwfQ.tsBIzjBtSoA2x9DHDXZ7kqDqjP-RXizp9XlopB5Eiuw",
          },
        }
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

export function updatePremium() {
  return async (dispatch) => {
    try {
      const { data: response } = await fetch(
        "http://localhost:3000/users/premium",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjU1NjMzNzQwfQ.tsBIzjBtSoA2x9DHDXZ7kqDqjP-RXizp9XlopB5Eiuw",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
}
