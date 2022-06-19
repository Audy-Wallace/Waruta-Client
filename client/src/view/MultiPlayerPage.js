import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import {connectSocket} from "../hooks/connectSocket.js"

function MultiPlayerPage() {
  // const socket = connectSocket()
  const [rooms, setRooms] = useState(null)
  // const [users, setUsers] = useState([])
  const [roomAvailable, setRoomAvailable] = useState(true)
  const navigate = useNavigate()

  function handleClickCreateRoom() {
    let roomId = uuidv4()
    navigate(`/multiplayer/${roomId}`)
    // socket.emit("connecting",
    //   {
    //     roomId: roomId,
    //     wordGuess: "",
    //     remainingGuess: 6
    //   }
    // )

    localStorage.setItem("rooms", JSON.stringify({
      roomId: roomId,
      wordGuess: "",
      remainingGuess: 0,
      pastAnswers: []
    }))

    // let rooms = JSON.parse(localStorage.getItem("rooms"))
  }

  function handleSubmitRoomId(event) {
    event.preventDefault()
    let roomId = event.target.roomId.value
    localStorage.setItem("rooms", JSON.stringify({
      roomId: roomId,
      wordGuess: "",
      remainingGuess: 0,
      pastAnswers: []
    }))
    navigate(`/multiplayer/${roomId}`)
  }
  return (
    <>
      {/* {roomAvailable === false &&
        <p>
          Room is full
        </p>
      } */}
      <div>
        <button type="button" onClick={handleClickCreateRoom}>Create Room</button>
      </div>
      <div>
        <form onSubmit={handleSubmitRoomId}>
          <input type="text" name="roomId"></input>
          <button>Join Room</button>
        </form>
      </div>
    </>
  )
}

export default MultiPlayerPage