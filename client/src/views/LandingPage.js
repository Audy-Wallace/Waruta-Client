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

  console.log(leaderboards, "ini dia bambang");

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
              Waruta, a wordle game you have never seen before!{" "}
            </p>
            <p className="text-white">
              Comes with Singleplayer and Multiplayer mode
            </p>
            <p className="text-white">
              and you can now compete or make a team to solve
            </p>
            <p className="text-white">a wordle game!</p>
            <br />
            <div className="flex">
              <NavLink to="/multiplayer">
                <button className="bg-pink-700 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                  Play Now
                </button>
              </NavLink>
              <p className="text-white mx-4 pt-2"> OR </p>
              <NavLink to="/login">
                <button className="bg-pink-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                  Login
                </button>
              </NavLink>
            </div>
          </div>
          <div className="image ml-16">
            <img
              src={require("../image-people.jpg")}
              className="rounded-xl opacity-90 shadow-xl"
              alt="people-discuss"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingPage;
