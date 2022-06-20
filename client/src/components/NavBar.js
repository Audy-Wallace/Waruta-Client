/* eslint-disable jsx-a11y/scope */
import Button from "@mui/material/Button";
import * as React from "react";
import Login from "./Login";
import Signup from "./Signup";
import { finishOrder, updatePremium } from "../stores/actions/midtransAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function NavBar() {
  const [showModal, setShowModal] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);
  const [showLeaderboard, setShowLeaderboard] = React.useState(false);
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
        <button
          className="text-lg text-rose-100 mx-2 px-2 py-[1px] rounded-lg bg-[#be50d6] hover:bg-transparent duration-300"
          type="button"
          onClick={() => setShowModal(true)}
        >
          SignUp
        </button>
        <button
          className="text-lg text-rose-100 mx-2 px-2 py-[1px] rounded-lg bg-[#be50d6] hover:bg-transparent duration-300"
          type="button"
          onClick={() => setShowLeaderboard(true)}
        >
          LeaderBoard
        </button>
        <button
          onClick={() => snapMidtrans()}
          className="text-lg text-rose-100 mx-2 px-2 py-[1px] rounded-lg bg-[#be50d6] hover:bg-transparent duration-300"
        ></button>
        {showModal ? (
          <>
            <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none w-full h-full">
              <div className="w-1/2 ">
                <div className="border-1 rounded-lg shadow-lg flex flex-col bg-white">
                  <div className="">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                      Signup to create an account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 mt-5">
                      Already have an account?{" "}
                      <button
                        onClick={() => {
                          setShowModal2(true);
                          setShowModal(false);
                        }}
                        className="font-medium text-purple-600 hover:text-purple-500"
                      >
                        login
                      </button>
                    </p>
                  </div>
                  <Signup />
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b ">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 w-full text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
        {showModal2 ? (
          <>
            <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none w-full h-full">
              <div className="w-1/2 ">
                <div className="border-1 rounded-lg shadow-lg flex flex-col bg-white">
                  <div className="">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                      Login to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 mt-5">
                      Don't have an account yet?{" "}
                      <button
                        onClick={() => {
                          setShowModal2(false);
                          setShowModal(true);
                        }}
                        className="font-medium text-purple-600 hover:text-purple-500"
                      >
                        register
                      </button>
                    </p>
                  </div>
                  <Login />
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b ">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 w-full text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal2(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
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
