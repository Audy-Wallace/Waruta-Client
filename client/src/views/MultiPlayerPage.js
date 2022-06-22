import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

function MultiPlayerPage({ socket }) {
  const [room, setRoom] = useState(null)
  const [message, setMessage] = useState()
  const [statusRoom, setStatusRoom] = useState(0)
  const [currentUser, setCurrentUser] = useState(0)
  const [wait, setWait] = useState(true)
  const navigate = useNavigate()

  function joinWaitingRoom(roomId) {
    setRoom(roomId)
    localStorage.setItem("rooms", JSON.stringify({
      roomId: roomId,
      wordGuess: "",
      remainingGuess: 0,
      pastAnswers: [],
      currentPlayer: null
    }))
    socket.emit("joinWaitingRoom",
      {
        roomId: roomId,
        username: localStorage.getItem("username"),
        wordGuess: "",
        remainingGuess: 0,
        pastAnswers: [],
        currentPlayer: null
      })

    //reset timer
    let keysRemove = ["win", "remainingTime", "time"]

    keysRemove.forEach((el) => {
      localStorage.removeItem(el)
    })
    navigate(`/multiplayer/${roomId}`)
  }

  function handleClickCreateRoom() {
    let roomId = uuidv4()
    setRoom(roomId)
    socket.emit("joinWaitingRoom", {
      roomId: roomId,
      username: localStorage.getItem("username"),
      wordGuess: "",
      remainingGuess: 0,
      pastAnswers: [],
      currentPlayer: null,
    })
    localStorage.setItem(
      "rooms",
      JSON.stringify({
        roomId: roomId,
        wordGuess: "",
        remainingGuess: 0,
        pastAnswers: [],
        currentPlayer: null,
      })
    )
    navigate(`/multiplayer/${roomId}`)
  }

  function handleSubmitRoomId(event) {
    event.preventDefault()
    let roomId = event.target.roomId.value
    setRoom(roomId)
    localStorage.setItem(
      "rooms",
      JSON.stringify({
        roomId: roomId,
        wordGuess: "",
        remainingGuess: 0,
        pastAnswers: [],
        currentPlayer: null,
      })
    )
    socket.emit("joinWaitingRoom", {
      roomId: roomId,
      username: localStorage.getItem("username"),
      wordGuess: "",
      remainingGuess: 0,
      pastAnswers: [],
      currentPlayer: null,
    })

    // connectToSocket(roomId)
    // joinRoom(roomId)
    joinWaitingRoom(roomId)

    navigate(`/multiplayer/${roomId}`)
  }

  function handlePlayGame() {
    console.log(room)
    // navigate(`/multiplayer/${room}`)
  }

  return (
    <>
      {/* {waitingRoom === true &&
        <p>
          Room is full
        </p>
      } */}

      {currentUser === 0 && (
        <>
          <div>
            <button type="button" onClick={handleClickCreateRoom}>
              Create Room
            </button>
          </div>
          <div>
            <form onSubmit={handleSubmitRoomId}>
              <input type="text" name="roomId"></input>
              <button>Join Room</button>
            </form>
          </div>
        </>
      )}
      {/* {currentUser === 1 &&
        <p>Wait another player</p>
      }

      {
        currentUser === 2 &&
        <div>
          <p>Ready to play</p>
          <button type="button" onClick={handlePlayGame}>Play</button>
        </div>
      } */}
    </>
  )
}

export default MultiPlayerPage
