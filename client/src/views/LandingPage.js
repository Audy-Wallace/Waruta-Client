import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchLeaderboard } from "../stores/actions/leaderboardAction"
import { useEffect } from "react"

function LandingPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchLeaderboard())
  }, [dispatch])

  const { leaderboards } = useSelector((state) => state.leaderboards)

  return (
    <>
      <div className="grid place-items-center">
        <div className="outer-container flex items-center p-4 bg-gradient-to-br from-yellow-400 to-yellow-800 rounded-lg shadow-lg mt-16 ">
          <div className="inner-container">
            {" "}
            <img src={require("../logo-waruta.png")} className="w-40" alt="waruta-logo" />
            <p className="text-white">Waruta, a wordle game you have never seen before! </p>
            <p className="text-white">Comes with Singleplayer and Multiplayer mode</p>
            <p className="text-white">and you can now compete or make a team to solve</p>
            <p className="text-white">a wordle game!</p>
            <br />
            <div className="flex justify-center pb-4">
              <div>
                <NavLink to="/singleplayer">
                  <button className="bg-transparent hover:bg-400 text-sky-400 hover:text-rose-600 hover:scale-105 duration-500 font-bold py-2 px-4 rounded shadow-lg">
                    Play Now
                  </button>
                </NavLink>
                <NavLink to="/singleplayer">
                  <button className="bg-rose-600 hover:bg-white text-white hover:text-rose-600 hover:scale-105 duration-500 font-bold py-2 px-4 rounded shadow-lg">
                    Play Now
                  </button>
                </NavLink>
              </div>
              <p className="text-white mx-4 pt-2"> OR </p>
              <NavLink to="/login">
                <button className="bg-purple-600 hover:bg-white text-white hover:text-purple-600 hover:scale-105 duration-500 font-bold py-2 px-4 rounded shadow-lg">
                  Login
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
  )
}

export default LandingPage
