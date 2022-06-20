import * as React from "react";
import { finishOrder, updatePremium } from "../stores/actions/midtransAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { register, login } from "../stores/actions/userAction";
export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      // console.log(response);
      localStorage.setItem("access_token", response.access_token);
      setIsOpenLogin(false);
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
  return (
    <div className="bg transparent h-16 flex justify-between items-center space-x-2 mr-4">
      <button
        variant="contained"
        className="text-xl text-rose-200 bg-transparent shadow-sm mx-4 mb-[1px] rounded-lg hover:text-sky-100 duration-500"
      >
        Waruta
      </button>
      <div>
        <button
          className="text-lg text-rose-100 mx-2 px-2 py-[1px] rounded-lg bg-[#be50d6] hover:bg-transparent duration-300"
          onClick={() => setIsOpenRegister(true)}
        >
          Sign Up
        </button>
        <Transition appear show={isOpenRegister} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setIsOpenRegister(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-bold leading-6 text-gray-900"
                    >
                      Register
                    </Dialog.Title>
                    <div className="mt-2">
                      <form className="flex flex-col">
                        <div className="flex flex-col mt-2">
                          <label>Profile Picture</label>
                          <input
                            type="file"
                            name="image"
                            className="h-8"
                            onChange={onChangeRegister}
                          />
                        </div>
                        <div className="flex flex-col mt-2">
                          <label>Username</label>
                          <input
                            type="text"
                            name="username"
                            className="border-[1px] h-8 border-[gray] rounded-lg px-4 py-2"
                            value={registerForm.username}
                            onChange={onChangeRegister}
                          />
                        </div>
                        <div className="flex flex-col mt-2">
                          <label>Email</label>
                          <input
                            type="text"
                            name="email"
                            className="border-[1px] h-8 border-[gray] rounded-lg px-4 py-2"
                            value={registerForm.email}
                            onChange={onChangeRegister}
                          />
                        </div>
                        <div className="flex flex-col my-2">
                          <label>Password</label>
                          <input
                            type="password"
                            name="password"
                            className="border-[1px] h-8 border-[gray] rounded-lg px-4 py-2"
                            value={registerForm.password}
                            onChange={onChangeRegister}
                          />
                        </div>
                        <div className="mt-2">
                          <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                            onClick={(e) => createUser(e)}
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
        <button
          className="text-lg text-rose-100 mx-2 px-2 py-[1px] rounded-lg bg-[#be50d6] hover:bg-transparent duration-300"
          onClick={() => setIsOpenLogin(true)}
        >
          Sign In
        </button>
        <Transition appear show={isOpenLogin} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setIsOpenLogin(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-bold leading-6 text-gray-900"
                    >
                      Sign In
                    </Dialog.Title>
                    <div className="mt-2">
                      <form className="flex flex-col">
                        <div className="flex flex-col mt-2">
                          <label>Email</label>
                          <input
                            type="text"
                            name="email"
                            className="border-[1px] h-8 border-[gray] rounded-lg px-4 py-2"
                            onChange={onChangeLogin}
                          />
                        </div>
                        <div className="flex flex-col my-2">
                          <label>Password</label>
                          <input
                            type="password"
                            name="password"
                            className="border-[1px] h-8 border-[gray] rounded-lg px-4 py-2"
                            onChange={onChangeLogin}
                          />
                        </div>
                        <div className="mt-2">
                          <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                            onClick={(e) => userLogin(e)}
                          >
                            Sign In
                          </button>
                        </div>
                      </form>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
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
