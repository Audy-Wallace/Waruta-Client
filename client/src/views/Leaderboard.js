export default function LeaderBoard() {
  return (
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
                <tr className="border-b dark:bg-purple-800 dark:border-gray-700">
                  <td className="px-6 py-4">1</td>
                  <td className="px-6 py-4">
                    {" "}
                    <img
                      src="https://mdbootstrap.com/img/new/standard/city/042.jpg"
                      className="w-20 h-auto shadow-lg "
                      alt=""
                    />
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    Pro_Player_1
                  </th>
                  <td className="px-6 py-4">5:31</td>
                  <td className="px-6 py-4">7</td>
                  <td className="px-6 py-4">180</td>
                </tr>
                <tr className="border-b dark:bg-purple-800 dark:border-gray-700">
                  <td className="px-6 py-4">2</td>
                  <td className="px-6 py-4">
                    {" "}
                    <img
                      src="https://mdbootstrap.com/img/new/standard/city/042.jpg"
                      className="w-20 h-auto shadow-lg "
                      alt=""
                    />
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    Amazing_Cheese08
                  </th>
                  <td className="px-6 py-4">5:31</td>
                  <td className="px-6 py-4">7</td>
                  <td className="px-6 py-4">180</td>
                </tr>
                <tr className="border-b dark:bg-purple-800 dark:border-gray-700">
                  <td className="px-6 py-4">3</td>
                  <td className="px-6 py-4">
                    {" "}
                    <img
                      src="https://mdbootstrap.com/img/new/standard/city/042.jpg"
                      className="w-20 h-auto shadow-lg "
                      alt=""
                    />
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-purple-900 dark:text-white whitespace-nowrap"
                  >
                    Magic_Mouse_22
                  </th>
                  <td className="px-6 py-4">5:31</td>
                  <td className="px-6 py-4">7</td>
                  <td className="px-6 py-4">180</td>
                </tr>
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
  );
}
