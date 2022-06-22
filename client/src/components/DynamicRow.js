export default function DynamicRow({ el, index }) {
  console.log(el);
  return (
    <tr className="border-b dark:bg-purple-800 dark:border-gray-700">
      <td className="px-6 py-4">{index + 1}</td>
      <td className="px-6 py-4">
        {" "}
        <img src={el.User.imgUrl} className="w-16 h-auto shadow-lg " alt="" />
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
      >
        {el.User.username}
      </th>
      <td className="px-6 py-4">{el.time}</td>
      <td className="px-6 py-4">{el.guess}</td>
      <td className="px-6 py-4">{el.score}</td>
    </tr>
  );
}
