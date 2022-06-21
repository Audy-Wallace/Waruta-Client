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
        <div className="outer-container flex flex-row mt-16 ">
          <div className="inner-container">
            {" "}
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
              <NavLink to="/singleplayer">
                <button className="bg-pink-700 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-[100%]">
                  Play Now
                </button>
              </NavLink>
            </div>
          </div>
          <div className="image ml-16">
            <img
              src={require("../waruta.png")}
              className="rounded-xl opacity-90 shadow-xl"
              alt="people-discuss"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
