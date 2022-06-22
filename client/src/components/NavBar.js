import * as React from "react";
import readPayload from "../helpers/readPayload";
import { finishOrder, updatePremium } from "../stores/actions/midtransAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, login } from "../stores/actions/userAction";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
export default function NavBar() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [localIsLogin, setLocalIsLogin] = React.useState(
    localStorage.getItem("access_token") ? true : false
  );
  const [isOpenRegister, setIsOpenRegister] = React.useState(false);
  const [isOpenLogin, setIsOpenLogin] = React.useState(false);
  const [registerForm, setRegisterForm] = React.useState({
    username: "",
    email: "",
    password: "",
    image: "",
  });
  const [loginForm, setLoginForm] = React.useState({
    email: "",
    password: "",
  });
  function onChangeRegister(e) {
    if (e.target.name === "image") {
      setRegisterForm({
        ...registerForm,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    }
  }
  function createUser(e) {
    e.preventDefault();
    uploadImage(registerForm.image)
      .then((res) => {
        if (!res.ok) throw new Error("Upload image failed");
        return res.json();
      })
      .then((data) => {
        dispatch(
          register({
            username: registerForm.username,
            email: registerForm.email,
            password: registerForm.password,
            imgUrl: data.url,
          })
        );
      })
      .catch((err) => console.log(err));
    setIsOpenRegister(false);
  }
  async function uploadImage(image) {
    console.log(image);
    const imgData = new FormData();
    imgData.append("file", image);
    imgData.append("upload_preset", "aelijkxb");
    imgData.append("cloud_name", "ds6yr7j32");
    return fetch("https://api.cloudinary.com/v1_1/ds6yr7j32/image/upload", {
      method: "post",
      body: imgData,
    });
  }
  function onChangeLogin(e) {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  }
  async function userLogin(e) {
    e.preventDefault();
    const response = await dispatch(login(loginForm));
    if (response.access_token) {
      localStorage.setItem("access_token", response.access_token);
      setIsOpenLogin(false);
      setLocalIsLogin(true);
    }
  }
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
  function logout() {
    localStorage.removeItem("access_token");
    setLocalIsLogin(false);
  }
  return (
    <div className="bg-gradient-to-bl from-[#F7EA00] to-[#E48900] h-16 flex justify-between items-center space-x-2">
      <div className="container-1 flex items-center">
        <img
          src={require("../waruta.png")}
          className="h-20 w-20 ml-2"
          alt="logo"
        />
        <button
          variant="contained"
          className="text-lg text-rose-200  bg-[#c236e2]  h-16  shadow-sm px-4  hover:text-sky-100 duration-500"
        >
          WARUTA
        </button>
        <button
          className="text-lg text-rose-100 px-2 bg-purple-60 border-neutral-400 h-16 hover:bg-transparent duration-300"
          type="button"
          onClick={() => navigate("/leaderboard", { replace: true })}
        >
          LeaderBoard
        </button>
        {!localIsLogin && (
          <>
            <button
              className="text-lg text-rose-100  px-2 h-16 bg-purple-600 hover:bg-transparent duration-300"
              onClick={() => setIsOpenRegister(true)}
            >
              Sign Up
            </button>
            <button
              className="text-lg text-rose-100 px-2 h-16 py-[1px]  bg-gradient-to-r from-purple-600  hover:bg-transparent duration-300"
              onClick={() => setIsOpenLogin(true)}
            >
              Sign In
            </button>
          </>
        )}
        {localIsLogin && (
          <>
            <button
              onClick={() => logout()}
              className="text-lg text-rose-100 px-2 py-[1px] h-16 bg-purple-600 hover:bg-transparent duration-300"
            >
              Sign Out
            </button>
          </>
        )}
        <SignupForm
          isOpenRegister={isOpenRegister}
          setIsOpenRegister={setIsOpenRegister}
          onChangeRegister={onChangeRegister}
          registerForm={registerForm}
          createUser={createUser}
        />
        <LoginForm
          isOpenLogin={isOpenLogin}
          setIsOpenLogin={setIsOpenLogin}
          onChangeLogin={onChangeLogin}
          userLogin={userLogin}
          loginForm={loginForm}
        />
      </div>
      {localIsLogin && (
        <>
          <div className="container-2">
            <button
              onClick={() => snapMidtrans()}
              className="text-lg text-rose-100 mx-2 px-2 py-[1px] rounded-lg bg-[#be50d6] hover:bg-transparent duration-300"
            >
              Unlock Multiplayer
            </button>
          </div>
        </>
      )}
    </div>
  );
}
