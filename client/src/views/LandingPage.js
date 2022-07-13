import { NavLink } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <div className="grid place-items-center">
        <div className="outer-container flex items-center justify-center p-5 bg-gradient-to-br from-yellow-400 to-yellow-800 rounded-lg shadow-lg my-[25vh] ">
          <div className="inner-container p-[15px]">
            <img
              src={require("../logo-waruta.png")}
              className="w-40 -ml-6"
              alt="waruta-logo"
            />
            <p className="text-white font-medium -mt-10">
              Waruta, a word guessing you have never seen before!
            </p>
            <p className="text-white font-medium">
              Comes with Singleplayer and Multiplayer mode,
            </p>
            <p className="text-white font-medium">
              you can now compete globally or invite a friend to play.
            </p>
            <p className="text-white font-medium">
              Are you ready for the challenge?
            </p>
            <br />
            <div className="flex flex-col w-full">
              <NavLink to="/singleplayer" replace={true}>
                <button className="bg-orange-400 hover:scale-105 duration-300 text-zinc-600 font-bold py-2 px-4 rounded w-[100%]">
                  Play Now
                </button>
              </NavLink>
            </div>
          </div>
          <div className="image ml-16">
            <img
              src={require("../waruta.png")}
              className="w-60 h-60 border-1 rounded-xl opacity-100 -mb-10 mr-3 bg-transparent shadow-xl"
              alt="people-discuss"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
