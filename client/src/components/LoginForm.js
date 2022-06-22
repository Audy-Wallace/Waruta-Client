import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
const LoginForm = ({
  setIsOpenLogin,
  isOpenLogin,
  onChangeLogin,
  userLogin,
}) => {
  return (
    <>
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

                          className="w-full inline-flex justify-center rounded-md border border-transparent bg-yellow-500 px-4 py-2 text-sm font-medium text-zinc-700 hover:scale-105 duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"

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
    </>
  );
};
export default LoginForm;
