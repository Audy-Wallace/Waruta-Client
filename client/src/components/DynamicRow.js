export default function DynamicRow({ el, index }) {
  return (
    <>
      <tr className=" bg-yellow-500 bg-opacity-90 rounded-lg ">
        <td className="px-6 py-4  text-center font-medium">{index + 1}</td>
        <td className="px-6 py-4">
          {" "}
          <img
            src={el.User.imgUrl}
            className="w-12 h-12 object-cover items-center shadow-lg "
            alt=""
          />
        </td>
        <th
          scope="row"
          className="px-6 py-4 text-center font-medium  whitespace-nowrap"
        >
          {el.User.username}
        </th>
        <td className="px-6 py-4 text-center font-medium">{el.time}</td>
        <td className="px-6 py-4 text-center  font-medium">{el.guess}</td>
        <td className="px-6 py-4 text-center  font-medium">{el.score}</td>
      </tr>
    </>
  );
}
