import Button from "@mui/material/Button";
import { finishOrder, updatePremium } from "../stores/actions/midtransAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function snapMidtrans() {
    dispatch(finishOrder())
      .then(async (res) => {
        await window.snap.pay(res.token, {
          onSuccess: async (result) => {
            dispatch(updatePremium());
            navigate("/");
          },
          onError: async (err) => {
            console.log(err);
          },
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="bg transparent h-16 flex justify-between items-center space-x-2 mr-4">
      <Button
        variant="contained"
        className="text-xl text-rose-200 bg-transparent shadow-sm mx-4 mb-[1px] rounded-lg hover:text-sky-100 duration-500"
      >
        Waruta
      </Button>
      <div>
        <button className="text-lg text-rose-100 mx-2 px-2 py-[1px] rounded-lg bg-[#be50d6] hover:bg-transparent duration-300">
          test
        </button>
        <button className="text-lg text-rose-100 mx-2 px-2 py-[1px] rounded-lg bg-[#be50d6] hover:bg-transparent duration-300">
          signin
        </button>
        <button
          onClick={() => snapMidtrans()}
          className="text-lg text-rose-100 mx-2 px-2 py-[1px] rounded-lg bg-[#be50d6] hover:bg-transparent duration-300"
        >
          Become Premium
        </button>
      </div>
    </div>
  );
}
