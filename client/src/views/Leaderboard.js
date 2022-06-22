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
  console.log(
    "🚀 ~ file: Leaderboard.js ~ line 11 ~ LeaderBoard ~ leaderboards",
    leaderboards.data
  );

  return (
    <>
      {leaderboards.data && (
        <div className="justify-center items-center flex fixed w-full h-full">
          <div className="w-1/2 ">
            <div className="">
              <div className="">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-transparent dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Profile Pict.
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Username
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Time
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Guess
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboards.data.map((el) => {
                      return <DynamicRow el={el} key={el.id} />;
                    })}
                    <tr className="px-4 py-4 w-full dark:bg-gray-800 dark:text-gray-400">
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
