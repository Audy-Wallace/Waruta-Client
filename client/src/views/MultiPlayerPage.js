import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import { fetchWords } from "../stores/actions/wordAction.js";
import { useDispatch, useSelector } from "react-redux";

function MultiPlayerPage({ socket }) {
  const { words } = useSelector((state) => state.words);
  const dispatch = useDispatch();
  const [room, setRoom] = useState(null)
  const [message, setMessage] = useState()
  const [statusRoom, setStatusRoom] = useState(true)
  const [currentUser, setCurrentUser] = useState(0)
  const [wait, setWait] = useState(true)
  const navigate = useNavigate()

  function joinWaitingRoom(roomId) {
    setRoom(roomId)
    socket.emit("joinWaitingRoom",
      {
        roomId: roomId,
        username: localStorage.getItem("username"),
        wordGuess: "",
        remainingGuess: 0,
        pastAnswers: [],
        currentPlayer: null,
        amoutWords: words.length
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
    socket.emit("joinWaitingRoom",
      {
        roomId: roomId,
        username: localStorage.getItem("username"),
        wordGuess: "",
        remainingGuess: 0,
        pastAnswers: [],
        currentPlayer: null
      })
    localStorage.setItem("rooms", JSON.stringify({
      roomId: roomId,
      wordGuess: "",
      remainingGuess: 0,
      pastAnswers: [],
      currentPlayer: null
    }))
    navigate(`/multiplayer/${roomId}`)
  }

  function handleSubmitRoomId(event) {
    event.preventDefault()
    let roomId = event.target.roomId.value
    console.log(currentUser);
    joinWaitingRoom(roomId)
  }

  useEffect(() => {
    dispatch(fetchWords())
  }, [])

  return (
    <>
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