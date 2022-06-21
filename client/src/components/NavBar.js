import * as React from "react"
import { finishOrder, updatePremium } from "../stores/actions/midtransAction"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { register, login } from "../stores/actions/userAction"
import SignupForm from "./SignupForm"
export default function NavBar() {
  const [showLeaderboard, setShowLeaderboard] = React.useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isOpenRegister, setIsOpenRegister] = React.useState(false)
  const [isOpenLogin, setIsOpenLogin] = React.useState(false)
  const [registerForm, setRegisterForm] = React.useState({
    username: "",
    email: "",
    password: "",
    image: "",
  })
  const [loginForm, setLoginForm] = React.useState({
    email: "",
    password: "",
  })
  function onChangeRegister(e) {
    if (e.target.name === "image") {
      setRegisterForm({
        ...registerForm,
        [e.target.name]: e.target.files[0],
      })
    } else {
      setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
    }
  }
  function createUser(e) {
    e.preventDefault()
    uploadImage(registerForm.image)
      .then((res) => {
        if (!res.ok) throw new Error("Upload image failed")
        return res.json()
      })
      .then((data) => {
        dispatch(
          register({
            username: registerForm.username,
            email: registerForm.email,
            password: registerForm.password,
            imgUrl: data.url,
          })
        )
      })
      .catch((err) => console.log(err))
    setIsOpenRegister(false)
  }
  async function uploadImage(image) {
    console.log(image)
    const imgData = new FormData()
    imgData.append("file", image)
    imgData.append("upload_preset", "aelijkxb")
    imgData.append("cloud_name", "ds6yr7j32")
    return fetch("https://api.cloudinary.com/v1_1/ds6yr7j32/image/upload", {
      method: "post",
      body: imgData,
    })
  }
  function onChangeLogin(e) {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
  }
  async function userLogin(e) {
    e.preventDefault()
    const response = await dispatch(login(loginForm))
    if (response.access_token) {
      // console.log(response);
      localStorage.setItem("access_token", response.access_token)
      setIsOpenLogin(false)
    }
  }
  async function snapMidtrans() {
    dispatch(finishOrder())
      .then(async (res) => {
        await window.snap.pay(res.token, {
          onSuccess: async (result) => {
            dispatch(updatePremium())
            navigate("/")
          },
          onError: async (err) => {
            console.log(err)
          },
        })
      })
      .catch((err) => console.log(err))
  }
  return (
    <div className="bg-purple-700 h-16 flex justify-between items-center space-x-2">
      <div className="container-1">
        <button
          variant="contained"
          className="text-lg text-rose-200  bg-[#c236e2]  h-16  shadow-sm px-4  hover:text-sky-100 duration-500"
        >
          WARUTA
        </button>
        <button
          className="text-lg text-rose-100 px-2 bg-purple-600 border-white border-neutral-400 h-16 hover:bg-transparent duration-300"
          type="button"
          onClick={() => setShowLeaderboard(true)}
        >
          LeaderBoard
        </button>
        <button
          className="text-lg text-rose-100  px-2 h-16 bg-purple-600 hover:bg-transparent duration-300"
          onClick={() => setIsOpenRegister(true)}
        >
          Sign Up
        </button>
        <button
          onClick={() => snapMidtrans()}
          className="text-lg text-rose-100 px-2 py-[1px] h-16 bg-purple-600 hover:bg-transparent duration-300"
        >
          Payment
        </button>
        {/* <SignupForm // <--- mungkin bisa digunakan
        isOpenRegister={isOpenRegister}
        setIsOpenRegister={setIsOpenRegister}
        onChangeRegister={onChangeRegister}
        registerForm={registerForm}
        createUser={createUser}
      /> */}
        <Transition appear show={isOpenRegister} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => setIsOpenRegister(false)}>
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
                      className="text-2xl font-semibold font-sans text-center leading-6 text-gray-600"
                    >
                      Register
                    </Dialog.Title>
                    <div className="mt-6">
                      <form className="w-full flex flex-col items-center space-y-5">
                        <input
                          type="text"
                          placeholder="username"
                          name="username"
                          className="bg-transparent w-4/5 text-lg text-gray-700 border-b-[2px] focus:border-yellow-500 duration-500 h-8 px-4 py-2 outline-none"
                          value={registerForm.username}
                          onChange={onChangeRegister}
                        />
                        <input
                          type="text"
                          placeholder="email"
                          name="email"
                          className="bg-transparent w-4/5 text-lg text-gray-700 border-b-[2px] focus:border-yellow-500 duration-500 h-8 px-4 py-2 outline-none"
                          value={registerForm.email}
                          onChange={onChangeRegister}
                        />

                        <input
                          type="password"
                          placeholder="password"
                          name="password"
                          className="bg-transparent w-4/5 text-lg text-gray-700 border-b-[2px] focus:border-yellow-500 duration-500 h-8 px-4 py-2 outline-none"
                          value={registerForm.password}
                          onChange={onChangeRegister}
                        />

                        <div className="flex flex-col mt-2 items-center">
                          <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-500">
                            Profile Picture
                          </label>
                          <input
                            type="file"
                            name="image"
                            className="block w-full text-sm text-gray-100 bg-gray-400 bg-opacity-90 outline-none border-none rounded border border-gray-300 cursor-pointer "
                            onChange={onChangeRegister}
                          />
                        </div>
                        <div className="mt-2 w-full flex justify-center">
                          <button
                            type="button"
                            className="w-1/2 inline-flex justify-center rounded-md border border-transparent bg-yellow-400 px-4 py-2 text-sm font-medium text-zinc-100 hover:bg-amber-400 duration-300 hover:animate-pulse focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
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
          className="text-lg text-rose-100 px-2 h-16 py-[1px]  bg-gradient-to-r from-purple-600  hover:bg-transparent duration-300"
          onClick={() => setIsOpenLogin(true)}
        >
          Sign In
        </button>
        <Transition appear show={isOpenLogin} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => setIsOpenLogin(false)}>
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
                      className="text-center text-2xl font-semibold leading-6 text-gray-700"
                    >
                      Sign In
                    </Dialog.Title>
                    <div className="mt-6 w-full">
                      <form className="flex flex-col items-center w-full space-y-5">
                        <input
                          type="text"
                          name="email"
                          placeholder="email"
                          className="bg-transparent w-4/5 text-lg text-gray-700 border-b-[2px] focus:border-rose-500 duration-500 h-8 px-4 py-2 outline-none"
                          onChange={onChangeLogin}
                        />

                        <input
                          placeholder="password"
                          type="password"
                          name="password"
                          className="bg-transparent w-4/5 text-lg text-gray-700 border-b-[2px] focus:border-rose-500 duration-500 h-8 px-4 py-2 outline-none"
                          onChange={onChangeLogin}
                        />
                        <div className="mt-2">
                          <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent bg-rose-500 px-4 py-2 text-sm font-medium text-violet-100 hover:bg-rose-700 duration-300"
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
            {showLeaderboard ? (
              <>
                <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none w-full h-full">
                  <div className="w-1/2 ">
                    {" "}
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2  text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowLeaderboard(false)}
                    >
                      X Close
                    </button>
                    <div className="border-1 rounded-lg shadow-lg flex flex-col bg-white">
                      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                          <thead class="text-xs text-gray-700 uppercase bg-transparent dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                              <th scope="col" class="px-6 py-3">
                                No
                              </th>
                              <th scope="col" class="px-6 py-3">
                                Profile Pict.
                              </th>
                              <th scope="col" class="px-6 py-3">
                                Username
                              </th>
                              <th scope="col" class="px-6 py-3">
                                Time
                              </th>
                              <th scope="col" class="px-6 py-3">
                                Guess
                              </th>
                              <th scope="col" class="px-6 py-3">
                                Score
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="border-b dark:bg-purple-800 dark:border-gray-700">
                              <td class="px-6 py-4">1</td>
                              <td class="px-6 py-4">
                                {" "}
                                <img
                                  src="https://mdbootstrap.com/img/new/standard/city/042.jpg"
                                  class="w-20 h-auto shadow-lg "
                                  alt=""
                                />
                              </td>
                              <th
                                scope="row"
                                class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                              >
                                Pro_Player_1
                              </th>
                              <td class="px-6 py-4">5:31</td>
                              <td class="px-6 py-4">7</td>
                              <td class="px-6 py-4">180</td>
                            </tr>
                            <tr class="border-b dark:bg-purple-800 dark:border-gray-700">
                              <td class="px-6 py-4">2</td>
                              <td class="px-6 py-4">
                                {" "}
                                <img
                                  src="https://mdbootstrap.com/img/new/standard/city/042.jpg"
                                  class="w-20 h-auto shadow-lg "
                                  alt=""
                                />
                              </td>
                              <th
                                scope="row"
                                class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                              >
                                Amazing_Cheese08
                              </th>
                              <td class="px-6 py-4">5:31</td>
                              <td class="px-6 py-4">7</td>
                              <td class="px-6 py-4">180</td>
                            </tr>
                            <tr class="border-b dark:bg-purple-800 dark:border-gray-700">
                              <td class="px-6 py-4">3</td>
                              <td class="px-6 py-4">
                                {" "}
                                <img
                                  src="https://mdbootstrap.com/img/new/standard/city/042.jpg"
                                  class="w-20 h-auto shadow-lg "
                                  alt=""
                                />
                              </td>
                              <th
                                scope="row"
                                class="px-6 py-4 font-medium text-purple-900 dark:text-white whitespace-nowrap"
                              >
                                Magic_Mouse_22
                              </th>
                              <td class="px-6 py-4">5:31</td>
                              <td class="px-6 py-4">7</td>
                              <td class="px-6 py-4">180</td>
                            </tr>
                            <tr class="px-4 py-4 w-full dark:bg-gray-800 dark:text-gray-400">
                              <td className="py-4"></td>
                              <td className="py-4"></td>
                              <td className="py-4"></td>
                              <td className="py-4"></td>
                              <td className="py-4"></td>
                              <td className="py-4"></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className=""></div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
          </Dialog>
        </Transition>
      </div>
      <div className="container-2">
        <button
          onClick={() => snapMidtrans()}
          className="text-lg text-rose-100 mx-2 px-2 py-[1px] rounded-lg bg-[#be50d6] hover:bg-transparent duration-300"
        >
          Become Premium
        </button>
      </div>
    </div>
  )
}
