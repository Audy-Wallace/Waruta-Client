import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaderboard } from "../stores/actions/leaderboardAction";
import { useEffect } from "react";

function LandingPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);
  const { leaderboards } = useSelector((state) => state.leaderboards);
  return (
    <>
      <div className="grid place-items-center">
        <div className="outer-container flex items-center justify-center p-4 bg-gradient-to-br from-yellow-400 to-yellow-800 rounded-lg shadow-lg my-60 ">
          <div className="inner-container p-0">
            <img
              src={require("../logo-waruta.png")}
              className="w-40"
              alt="waruta-logo"
            />
            <p className="text-white">
              Waruta, a word guessing you have never seen before!
            </p>
            <p className="text-white">
              Comes with Singleplayer and Multiplayer mode,
            </p>
            <p className="text-white">
              you can now compete globally or invite a friend to play.
            </p>
            <p className="text-white">Are you ready for the challenge?</p>
            <br />
            <div className="flex flex-col w-full">
              <NavLink to="/singleplayer" replace={true}>
                <button className="bg-pink-700 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-[100%]">
                  Play Now
                </button>
              </NavLink>
            </div>
          </div>
          <div className="image ml-16">
            <img
              src={require("../waruta.png")}
              className="w-60 h-60 rounded-xl opacity-90 bg-transparent shadow-xl"
              alt="people-discuss"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
