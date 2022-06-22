import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import Timer from "../components/Timer.js"
import Peer from "simple-peer"

let remoteId
const mockData = [
  {
    name: "test1",
    location: "mars",
    color: "white",
    ingredients: "santan",
    taste: "salty",
    clue: "food",
  },
  {
    name: "test2",
    location: "saturn",
    color: "yellow",
    ingredients: "beras",
    taste: "umami",
    clue: "food",
  },
  {
    name: "test3",
    location: "paret",
    color: "brown",
    ingredients: "santan",
    taste: "bitter",
    clue: "food",
  },
  {
    name: "test4",
    location: "bumi la",
    color: "peach",
    ingredients: "milk",
    taste: "sweet",
    clue: "food",
  },
]

const food = {
  name: "test1",
  location: "mars",
  color: "white",
  ingredients: "santan",
  taste: "salty",
  clue: "food",
}

function MultiPlayerRoom({ socket }) {
  const { roomId } = useParams()
  const rooms = JSON.parse(localStorage.getItem("rooms"))
  const [answer, setAnswer] = useState("")
  const [correct, setCorrect] = useState("")
  const [gameEnd, setGameEnd] = useState(false)
  const [remainingGuess, setRemainingGuess] = useState(0)
  const [message, setMessage] = useState("")
  const [pastAnswers, setPastAnswers] = useState([])
  const mainKeys = Object.keys(food)
  const [yourTurn, setYourTurn] = useState(false)
  const [wait, setWait] = useState(true)
  const [timeup, setTimeup] = useState(false)
  // timer
  const [isCorrect, setIsCorrect] = useState(false)
  const [remainSeconds, setRemainSeconds] = useState(0)

  //? Web RTC
  const [yourID, setYourID] = useState("")
  const [partnerID, setPartnerID] = useState("")
  const [users, setUsers] = useState({})
  const [stream, setStream] = useState()
  const [receivingCall, setReceivingCall] = useState(false)
  const [caller, setCaller] = useState("")
  const [callerSignal, setCallerSignal] = useState()
  const [callAccepted, setCallAccepted] = useState(false)
  const [isCalled, setisCalled] = useState(false)
  const [callerUser, setCallerUser] = useState("")

  const myVideo = useRef()
  const partnerVideo = useRef()
  const socketVid = useRef()

  function handleSubmitAnswer(event) {
    event.preventDefault()
    let inputAnswer = event.target.answer.value
    console.log(inputAnswer)
    let currentGuess = rooms.remainingGuess
    let tempCurrentuser = ""
    tempCurrentuser = localStorage.getItem("username")
    const payload = {
      roomId: roomId,
      wordGuess: inputAnswer,
      remainingGuess: currentGuess,
      pastAnswers: rooms.pastAnswers,
      currentPlayer: tempCurrentuser,
    }

    if (!gameEnd && currentGuess < 6) {
      if (rooms.currentPlayer === tempCurrentuser) {
        setMessage("Wait another player")
        setTimeout(() => {
          setMessage("")
        }, 3000)
      } else if (rooms.currentPlayer === null || rooms.currentPlayer !== tempCurrentuser) {
        setAnswer(inputAnswer)

        const userGuess = mockData.find((el) => el.name === inputAnswer)

        if (userGuess !== undefined) {
          const keys = Object.keys(userGuess)
          const obj = {}
          keys.forEach((key) => {
            if (userGuess[key] !== food[key]) {
              obj[key] = {
                value: userGuess[key],
                isCorrect: false,
              }
            } else {
              obj[key] = {
                value: userGuess[key],
                isCorrect: true,
              }
            }
          })

          if (inputAnswer !== food.name) {
            currentGuess += 1
            payload.remainingGuess = currentGuess
            console.log(currentGuess)
            setCorrect(inputAnswer + " is incorrect")
          } else {
            currentGuess += 1
            payload.remainingGuess = currentGuess
            setCorrect(inputAnswer + " is correct")
            setGameEnd(true)
            setIsCorrect(true);
            let keysRemove = ["time"]

            keysRemove.forEach((el) => {
              localStorage.removeItem(el)
            })
          }

          payload.pastAnswers = [...payload.pastAnswers, obj]

          localStorage.setItem("rooms", JSON.stringify(payload))

          socket.emit("hitAnswer", payload)
        } else {
          setMessage(inputAnswer + " does not exist")
        }
      }
      //
    } else {
      setGameEnd(true)
      setMessage("Game was end.")
    }

    setRemainingGuess(currentGuess)
    // event.target.answer.value = ""//
  }

  function evaluating(isCorrect) {
    if (isCorrect) {
      return {
        border: "1px solid",
        backgroundColor: "lightgreen",
      }
    }
    return {
      border: "1px solid",
    }
  }

  useEffect(() => {
    socketVid.current = socket
    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
      setStream(stream)
      if (myVideo.current) {
        myVideo.current.srcObject = stream
      }
    })
    socket.on("joinedWaitingRoom", (payload) => {
      console.log(socket.id)

      if (payload.users === 2) {
        setWait(false)
      }

      console.log(payload)
    })

    socket.on("initiateCall", ({ users }) => {
      setYourID(users.user1)
      setPartnerID(users.user2)
    })

    socketVid.current.on("yourID", (id) => {
      setYourID(id)
    })

    socketVid.current.on("allUsers", (users) => {
      setUsers(users)
    })
    socketVid.current.on("hey", (data) => {
      setisCalled(true)
      setReceivingCall(true)
      setCaller(data.from)
      setCallerSignal(data.signal)
      setCallerUser(data.callerUsername)
      // console.log(stream, 'ini isi stream ketika hey dan sebelum accept call')
    })
    socket.on("backAnswer", (payload) => {
      setAnswer(payload.wordGuess)
      setRemainingGuess(payload.remainingGuess)
      if (payload.remainingGuess === 6) {
        setGameEnd(true)
        setMessage("The rest of the guesses run out")
      }
      if (payload.wordGuess !== food.name) {
        setCorrect(payload.wordGuess + " is incorrect")
      } else {
        setCorrect(payload.wordGuess + " is correct");
        setGameEnd(true);
        setIsCorrect(true);
        let keysRemove = ["time"]

        keysRemove.forEach((el) => {
          localStorage.removeItem(el)
        })
      }
      if (!gameEnd) {
        localStorage.setItem(
          "rooms",
          JSON.stringify({
            roomId: payload.roomId,
            wordGuess: payload.wordGuess,
            remainingGuess: payload.remainingGuess,
            pastAnswers: payload.pastAnswers,
            currentPlayer: payload.currentPlayer,
          })
        )
      }
    })
  }, [socket, setWait])

  function callPeer(id) {
    console.log(id, "<<<<<<<")
    setisCalled(true)
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    })

    peer.on("signal", (data) => {
      socketVid.current.emit("callUser", {
        roomid: roomId,
        userToCall: id,
        signalData: data,
        from: yourID,
      })
    })

    peer.on("stream", (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream
      }
    })

    socketVid.current.on("callAccepted", (signal) => {
      setCallAccepted(true)
      peer.signal(signal)
    })
  }

  function acceptCall() {
    setReceivingCall(false)
    setCallAccepted(true)
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    })
    peer.on("signal", (data) => {
      socketVid.current.emit("acceptCall", {
        signal: data,
        roomid: roomId,
        to: caller,
      })
    })

    peer.on("stream", (stream) => {
      partnerVideo.current.srcObject = stream
    })

    peer.signal(callerSignal)
  }

  let UserVideo
  if (stream) {
    UserVideo = <video className="w-[300px] h-[210px]" playsInline muted ref={myVideo} autoPlay />
  }

  let PartnerVideo
  if (callAccepted) {
    PartnerVideo = (
      <video className="w-[300px] h-[210px] " playsInline ref={partnerVideo} autoPlay />
    )
  }

  let incomingCall
  if (receivingCall) {
    incomingCall = (
      <div>
        <h5>{callerUser} is asking you to open cam</h5>
        <button onClick={acceptCall} className="p-2 text-white bg-indigo-500 ">
          Accept
        </button>
      </div>
    )
  }

  return (
    <>
      {wait === false && (
        <>
          <div>
            <div className="flex flex-row justify-between mx-12 mt-4">
              <div className="flex flex-col items-center">
                <h1 className="text-white py-1 px-2 bg-yellow-300 rounded text-lg ">Player 2</h1>
                <div className="w-[290px] h-[220px] bg-yellow-200 border-4 border-yellow-500 rounded-lg">
                  {PartnerVideo}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-white py-1 px-2 bg-yellow-300 rounded text-lg">You</h1>
                <div className="w-[290px] h-[220px] bg-yellow-200 border-4 border-yellow-500 rounded-lg">
                  {UserVideo}
                </div>
              </div>
            </div>
            {isCalled ? (
              <> </>
            ) : (
              <div className="flex flex-row justify-start">
                <div className="">
                  <button
                    onClick={() => callPeer(partnerID)}
                    className="p-2 text-white bg-indigo-500 "
                  >
                    Ask your opponent to open cam
                  </button>
                </div>
              </div>
            )}
            {incomingCall}
            <Timer
              isCorrect={isCorrect}
              remainSeconds={remainSeconds}
              setRemainSeconds={setRemainSeconds}
              setTimeup={setTimeup}
            ></Timer>
            <p>Room Id : {roomId}</p>
            <label>Answer : {answer}</label>
            <span id="answer"></span>
            <h1>{correct}</h1>

            <p>Guess {remainingGuess} of 6</p>
            <p id="error"></p>
            <form onSubmit={handleSubmitAnswer}>
              <input type={"text"} id="inputChat" name="answer" />
              <button type={"submit"} id="sendButton">
                Send
              </button>
            </form>
            <h1 style={{ border: "1px solid" }}>{message}</h1>

            <div>
              <table style={{ border: "1px solie", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {mainKeys.map((mainKey, i) => {
                      return (
                        <th scope="col" key={i} style={{ border: "1px solid" }}>
                          {mainKey}
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody>
                  {rooms.pastAnswers.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td style={evaluating(item.name.isCorrect)}>{item.name.value}</td>
                        <td style={evaluating(item.location.isCorrect)}>{item.location.value}</td>
                        <td style={evaluating(item.color.isCorrect)}>{item.color.value}</td>
                        <td style={evaluating(item.ingredients.isCorrect)}>
                          {item.ingredients.value}
                        </td>
                        <td style={evaluating(item.taste.isCorrect)}>{item.taste.value}</td>
                        <td style={evaluating(item.clue.isCorrect)}>{item.clue.value}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <h1>{yourTurn}</h1>
          </div>
        </>
      )}

      {wait === true && (
        <>
          <p>Waiting another player</p>
        </>
      )}
    </>
  )
}

export default MultiPlayerRoom
