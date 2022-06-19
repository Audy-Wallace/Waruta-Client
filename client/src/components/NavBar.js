import Button from "@mui/material/Button"

export default function NavBar() {
  return (
    <div className="bg transparent h-16 flex justify-between items-center space-x-2 mr-4">
      <Button
        variant="contained"
        className="text-xl text-rose-200 bg-transparent shadow-sm mx-4 mb-[1px] rounded-lg hover:text-sky-100 duration-500"
      >
        Waruta
      </Button>
      <div>
        <button className="text-lg text-rose-100 mx-2 px-2 py-[1px] rounded-lg bg-[#be50d6] hover:bg-transparent duration-300">
          test
        </button>
        <button className="text-lg text-rose-100 mx-2 px-2 py-[1px] rounded-lg bg-[#be50d6] hover:bg-transparent duration-300">
          signin
        </button>
      </div>
    </div>
  )
}
