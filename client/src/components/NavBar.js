import * as React from "react";
import readPayload from "../helpers/readPayload";
import Swal from "sweetalert2";
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
  const [alreadyPremium, setAlreadyPremium] = React.useState(false);
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
      .catch((err) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err,
        })
      );
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
    try {
      if (loginForm.email.length < 1 && loginForm.password.length < 1) {
        throw new Error("E-mail and password is required");
      }
      if (loginForm.password.length < 1) {
        throw new Error("Password is required");
      }
      if (loginForm.email.length < 1) {
        throw new Error("E-mail is required");
      }
      const response = await dispatch(login(loginForm));
      if (response.access_token) {
        localStorage.setItem("access_token", response.access_token);
        if (response.isPremium) {
          localStorage.setItem("warutapr", "asdadsa");
        }
        localStorage.setItem("username", response.email);
        setIsOpenLogin(false);
        setLocalIsLogin(true);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err,
      });
    }
  }
  async function snapMidtrans() {
    dispatch(finishOrder())
      .then(async (res) => {
        await window.snap.pay(res.token, {
          onSuccess: async (result) => {
            dispatch(updatePremium());
            localStorage.setItem("warutapr", "asdadsa");
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
    console.log("logout jalan");
    localStorage.removeItem("access_token");
    localStorage.removeItem("warutapr");
    setLocalIsLogin(false);
    localStorage.clear();
  }
  function removeItem() {
    localStorage.removeItem("index");
    localStorage.removeItem("score");
    localStorage.removeItem("user_guesses");
    localStorage.removeItem("remainingTime");
    localStorage.removeItem("win");
    localStorage.removeItem("pastAnswers");
    localStorage.removeItem("time");
  }
  function checkPlay(route) {
    const isPlay = localStorage.getItem("time");
    if (isPlay) {
      Swal.fire({
        icon: "warning",
        title: "Are you sure you want to quit?",
        showDenyButton: true,
        confirmButtonText: "Yes! I want to leave",
        denyButtonText: `No! I want to keep playing`,
      }).then((result) => {
        if (result.isConfirmed) {
          removeItem();
          if (route === "logout") {
            logout();
            navigate(`/`, { replace: true });
          } else {
            navigate(`/${route}`, { replace: true });
          }
        }
      });
    } else {
      if (route === "logout") {
        logout();
        console.log('test')
        navigate(`/`, { replace: true });
      } else {
        navigate(`/${route}`, { replace: true });
      }
    }
  }
  return (
    <div className="bg-gradient-to-bl from-[#F7EA00] to-[#E48900] h-16 flex justify-between items-center space-x-2 py-[25px]">
      <div className="container-1 flex items-center">
        <button onClick={() => {
          checkPlay("");
        }}>

          <img
            src={require("../waruta-navbar-v2.png")}
            className="h-[70px] w-[70px] ml-2 mt-[5px]"
            style={{ borderRadius: 50 }}
            alt="logo"
          />
        </button>
        <button
          variant="contained"
          className="text-lg text-white font-medium h-16 shadow-sm px-4 -ml-[10px] hover:text-sky-200 duration-500"
          onClick={() => {
            checkPlay("");
          }}
        >
          WARUTA
        </button>
        <button
          className="text-lg text-white font-medium px-2 border-neutral-400 hover:text-sky-200 h-16 hover:bg-transparent duration-300"
          type="button"
          onClick={() => checkPlay("leaderboard")}
        >
          <div className="flex flex-col items-center ">
            <img src={require("../Leaderboard2.png")}
              className="h-[35px] w-[35px] mt-[2px]"
              // style={{ borderRadius: 50 }}
              alt="logo">
            </img>
            <label className="ml-[3px] cursor-pointer">Leaderboard</label>
          </div>
        </button>
        {!localIsLogin && (
          <>
            <button
              className="text-lg text-white font-medium px-2 h-16  hover:text-sky-200  duration-300"
              onClick={() => setIsOpenRegister(true)}
            >
              Sign Up
            </button>
            <button
              className="text-lg text-white font-medium px-2 h-16 py-[1px]  hover:text-sky-200  duration-300"
              onClick={() => setIsOpenLogin(true)}
            >
              Sign In
            </button>
          </>
        )}

        {localIsLogin && localStorage.getItem("warutapr") === "asdadsa" && (

          <button
            className="text-lg text-white font-medium px-2 border-neutral-400 hover:text-sky-200 h-16 duration-300"
            type="button"
            onClick={() => navigate("/multiplayer", { replace: true })}
          >
            <div className="flex flex-col justify-center items-center" >
              <img src={require("../multiplayer.png")}
                className="h-[40px] w-[40px] "
                // style={{ borderRadius: 50 }}
                alt="logo">
              </img>
              <label className="ml-[3px] -mt-[3px] cursor-pointer">Multiplayer</label>
            </div>
          </button>

        )}
        {/* {localIsLogin && localStorage.getItem("warutapr") === "asdadsa" && (
          <button
            className="text-lg text-white font-medium px-2 border-neutral-400 hover:text-sky-200 h-16 duration-300"
            type="button"
            onClick={() => navigate("/multiplayer", { replace: true })}
          >
            <img src={require("../multiplayer2.png")}
              className="h-[40px] w-[40px] ml-2"
              // style={{ borderRadius: 50 }}
              alt="logo">
            </img>
          </button>
        )} */}

        {/* <div>
          {localIsLogin && (
            <>
              <button
                onClick={() => checkPlay("logout")}
                className="text-lg text-white font-medium px-2 py-[1px] h-16  hover:bg-transparent duration-300"
              >
                <img src={require("../logout-2.png")}
                  className="h-[40px] w-[40px] ml-2"
                  // style={{ borderRadius: 50 }}
                  alt="logo">
                </img>
              </button>
            </>
          )}
        </div> */}

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
      <>

        {localIsLogin && localStorage.getItem("warutapr") !== "asdadsa" && (
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={() => snapMidtrans()}
              className="text-lg text-white font-medium mx-2 my-10 px-2 py-[2px] rounded-lg hover:text-sky-200 "
            >
              <img src={require("../unlock2.png")}
                className="h-[35px] w-[35px] mt-[3px]"
                // style={{ borderRadius: 50 }}
                alt="logo">
              </img>
              <label className="-ml-[3.4rem] cursor-pointer">Unlock Multiplayer</label>
            </button>
          </div>
        )}

        {/* {localIsLogin && localStorage.getItem("warutapr") === "asdadsa" && (

          <button
            className="text-lg text-white font-medium px-2 border-neutral-400 hover:text-sky-200 h-16 duration-300"
            type="button"
            onClick={() => navigate("/multiplayer", { replace: true })}
          >
            <div className="flex flex-col justify-center items-center" >
              <button
                onClick={() => checkPlay("logout")}
                className="text-lg text-white font-medium px-2 py-[2px] hover:bg-transparent duration-300"
              >
                <img src={require("../logout.jpg")}
                  className="h-[20px] w-[20px] ml-2"
                  // style={{ borderRadius: 50 }}
                  alt="logo">
                </img>
                <label>Logout</label>
              </button>
            </div>
          </button>
        )} */}

        <div className="container-2">
          {localIsLogin && (
            <>
              <div className="flex flex-col">
                <button
                  onClick={() => checkPlay("logout")}
                  className="text-lg text-zinc-700 mt-[5px] font-medium px-4 py-[2px] hover:bg-transparent duration-300"
                >
                  <img src={require("../logout-2.png")}
                    className="h-[35px] w-[35px] ml-2"
                    // style={{ borderRadius: 50 }}
                    alt="logo">
                  </img>
                </button>
              </div>
            </>
          )}
        </div>
      </>
    </div>
  );
}
