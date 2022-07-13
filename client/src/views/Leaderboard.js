import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchLeaderboard } from "../stores/actions/leaderboardAction";
import DynamicRow from "../components/DynamicRow";

export default function LeaderBoard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);
  const { leaderboards } = useSelector((state) => state.leaderboards);

  return (
    <>
      {leaderboards.data && (
        <div className="justify-center items-center flex flex-col w-full mt-24 ">
          <div className="title  ">
            <div className="from-orange-500 to-yellow-500 border-2 border-white-900 px-4 pt-4 pb-4 mb-12 rounded-lg bg-gradient-to-b">
              <h1 className="font-bold text-2xl  text-white outline-4">
                WARUTA LEADERBOARD
              </h1>
            </div>
          </div>
          <div className="w-1/2 h-[50vh] relative overflow-y-scroll shadow-md sm:rounded-lg border-2">
            <table className="w-full text-sm font-border text-left text-white ">
              <thead className="text-xs uppercase bg-gradient-to-t from-yellow-500 via-orange-500 to-orange-500  opacity-90 rounded-lg text-gray-400 border-white">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-white text-center outline-4 outline-black"
                  >
                    Rank
                  </th>
                  <th scope="col" className="text-white text-center"></th>
                  <th scope="col" className="px-6 py-3 text-white text-center">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3  text-white text-center">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3  text-white text-center">
                    Guess
                  </th>
                  <th scope="col" className="px-6 py-3  text-white text-center">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {leaderboards.data.map((el, index) => {
                  return <DynamicRow el={el} index={index} key={el.id} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
