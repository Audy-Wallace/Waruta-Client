/* eslint-disable jsx-a11y/anchor-is-valid */
import Button from "@mui/material/Button";
import * as React from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function NavBar() {
  const [showModal, setShowModal] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);
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
      </div>
    </div>
  );
}
