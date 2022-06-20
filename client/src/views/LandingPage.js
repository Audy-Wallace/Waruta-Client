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
      <div>
        <p>Landing Page</p>
        <NavLink to="/multiplayer">
          <button>Multiplayer</button>
        </NavLink>
      </div>
    </>
  )
}

export default LandingPage;
