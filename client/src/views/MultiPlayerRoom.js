import { useState, useEffect, Fragment, useRef } from "react"
import { NavLink, useParams, useNavigate } from "react-router-dom"
import { fetchWords } from "../stores/actions/wordAction.js"
import Timer from "../components/Timer.js"
import { useDispatch, useSelector } from "react-redux"
import { CopyToClipboard } from "react-copy-to-clipboard"
import JSConfetti from "js-confetti"
import { Dialog, Transition } from "@headlessui/react"
import { Peer } from "peerjs";

function MultiPlayerRoom({ socket }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { words } = useSelector((state) => state.words)
  const { roomId } = useParams()
  const rooms = JSON.parse(localStorage.getItem("rooms"))
  const [answer, setAnswer] = useState("")
  const [correct, setCorrect] = useState("")
  const [gameEnd, setGameEnd] = useState(false)
  const [remainingGuess, setRemainingGuess] = useState(0)
  const [message, setMessage] = useState("")
  const [pastAnswers, setPastAnswers] = useState([])
  const [yourTurn, setYourTurn] = useState("")
  const [wait, setWait] = useState(true)
  const [roomFull, setRoomFull] = useState(false)
  const [play, setPlay] = useState(false)
  const [localWords, setLocalWords] = useState([])
  const [localSolution, setLocalSolution] = useState("")
  const mainKeys = Object.keys(words[0])
  const [copiedRoomId, setCopiedRoomId] = useState("")
  const jsConfetti = new JSConfetti()
  const [hint, setHint] = useState(false)
  const [open, setOpen] = useState(false)
  const [timeup, setTimeup] = useState(false)
  const [lose, setLose] = useState(false)
  const [wrong, setWrong] = useState(false)
  const [result, setResult] = useState({})

  // peer connection
  const [peer, setPeer] = useState(null)
  const [peerId, setPeerId] = useState(null)
  const [peerIds, setPeerIds] = useState([])
  const myVideo = useRef()
  const partnerVideo = useRef()

  // timer
  const [isCorrect, setIsCorrect] = useState(false)
  const [remainSeconds, setRemainSeconds] = useState(0)

  function handleSubmitAnswer(event) {
    event.preventDefault()
    let inputAnswer = event.target.answer.value
    console.log(inputAnswer)
    let currentGuess = rooms.remainingGuess
    let tempCurrentuser = ""
    tempCurrentuser = localStorage.getItem("username")
    let solution = words[rooms.multiplayerIndex]
    console.log(words, rooms.multiplayerIndex, "me submit")
    const payload = {
      roomId: roomId,
      wordGuess: inputAnswer,
      remainingGuess: currentGuess,
      pastAnswers: rooms.pastAnswers,
      currentPlayer: tempCurrentuser,
      multiplayerIndex: rooms.multiplayerIndex,
    }

    if (!gameEnd && currentGuess < 6) {
      if (rooms.currentPlayer === tempCurrentuser) {
        setMessage("Waiting another player")
        setYourTurn("Your partner's turn")
        setTimeout(() => {
          setYourTurn("")
        }, 3000)
      } else if (rooms.currentPlayer === null || rooms.currentPlayer !== tempCurrentuser) {
        setAnswer(inputAnswer)

        const userGuess = words.find((el) => el.name.toLowerCase() === inputAnswer.toLowerCase())

        if (userGuess !== undefined) {
          const keys = Object.keys(userGuess)
          const obj = {}
          keys.forEach((key) => {
            if (userGuess[key] !== solution[key]) {
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

          if (inputAnswer.toLowerCase() !== solution.name.toLowerCase()) {
            currentGuess += 1
            payload.remainingGuess = currentGuess
          } else {
            // if answer correct
            currentGuess += 1
            payload.remainingGuess = currentGuess
            setGameEnd(true)
            setIsCorrect(true)

            // scoring
            localStorage.setItem("win", true)
            localStorage.setItem("remainingTime", remainSeconds)
            let guessScore
            switch (payload.remainingGuess) {
              case 1:
                guessScore = 60
                break
              case 2:
                guessScore = 50
                break
              case 3:
                guessScore = 40
                break
              case 4:
                guessScore = 30
                break
              case 5:
                guessScore = 20
                break
              default:
                guessScore = 10
                break
            }

            let timeScore
            const secondsLeft = +localStorage.getItem("remainingTime")

            if (secondsLeft >= 240 && secondsLeft <= 300) {
              timeScore = 60
            } else if (secondsLeft >= 180) {
              timeScore = 50
            } else if (secondsLeft >= 120) {
              timeScore = 40
            } else if (secondsLeft >= 60) {
              timeScore = 30
            } else if (secondsLeft >= 30) {
              timeScore = 20
            } else if (secondsLeft >= 0) {
              timeScore = 10
            }

            const score = guessScore + timeScore
            localStorage.setItem("score", score)
            setOpen(true)
            // setGameDone(true);
            jsConfetti.addConfetti({
              confettiRadius: 2,
              confettiNumber: 100,
              emojis: ["🍔", "🥓", "🍟", "🍣"],
              emojiSize: 60,
            })
            payload.score = score
            payload.remainingTime = secondsLeft
          }

          payload.pastAnswers = [...payload.pastAnswers, obj]
          localStorage.setItem("rooms", JSON.stringify(payload))

          socket.emit("hitAnswer", payload)
        } else {
          // setMessage(inputAnswer + " does not exist")
          setWrong(true)
        }
      }
      //
    } else {
      setGameEnd(true)
      setMessage("Game has ended.")
      setLose(true)
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

  function removeItem() {
    localStorage.removeItem("index")
    localStorage.removeItem("score")
    localStorage.removeItem("user_guesses")
    localStorage.removeItem("remainingTime")
    localStorage.removeItem("win")
    localStorage.removeItem("pastAnswers")
    localStorage.removeItem("time")
  }

  function stopStreamedVideo() {
    const stream = myVideo.current.srcObject
    const tracks = stream.getTracks()

    tracks.forEach(function (track) {
      track.stop()
    })

    myVideo.current.srcObject = null
    partnerVideo.current.srcObject = null
  }

  function goBackHome() {
    return (
      <button
      type="button"
      onClick={() => {
          setPeer(null)
          setTimeup(false)
          setLose(false)
          removeItem()
          navigate("/", { replace: true })
          stopStreamedVideo()
        }}
      >
        Go Back Home
      </button>
    )
  }

  function close() {
    setOpen(false)
  }

  // peer init
  useEffect(() => {
    const _peer = new Peer({
      config: {
        iceServers: [
          { url: "stun:stun.l.google.com:19302" },
          {
            url: "turn:numb.viagenie.ca",
            credential: "muazkh",
            username: "webrtc@live.com",
          },
        ],
      },
    })
    setPeer(_peer)
  }, [])

  useEffect(() => {
    socket.on("joinedWaitingRoom", (payload) => {
      console.log(payload)

      setLocalSolution(words ? words[payload.randomIndex] : "")
      if (payload.totalUser <= 2) {
        setPlay(true)
      }

      if (payload.totalUser === 2) {
        localStorage.setItem(
          "rooms",
          JSON.stringify({
            roomId: roomId,
            wordGuess: "",
            remainingGuess: 0,
            pastAnswers: [],
            currentPlayer: null,
            multiplayerIndex: payload.randomIndex,
          })
        )
        setWait(false)
        setPlay(true)
      } else if (payload > 2) {
        setRoomFull(true)
        setPlay(false)
      }
    })

    socket.on("backAnswer", (payload) => {
      setAnswer(payload.wordGuess)
      setRemainingGuess(payload.remainingGuess)
      let solution = words[payload.multiplayerIndex]
      console.log(words, payload.multiplayerIndex, solution, "another user submit")
      if (payload.remainingGuess === 6) {
        setGameEnd(true)
        setMessage("The rest of the guesses run out")
        setLose(true)
      }

      if (payload.wordGuess.toLowerCase() !== solution.name.toLowerCase()) {
        setCorrect(payload.wordGuess + " is incorrect")
        // setWrong(true);
      } else {
        console.log(payload, ">>>>>>>>>>>>>>>>");
        // to other user if true answer
        setCorrect(payload.wordGuess + " is correct")
        setGameEnd(true)
        setIsCorrect(true)
        jsConfetti.addConfetti({
          confettiRadius: 2,
          confettiNumber: 100,
          emojis: ["🍔", "🥓", "🍟", "🍣"],
          emojiSize: 60,
        })
        setOpen(true)
        setResult({
          score: payload.score,
          remainingTime: payload.remainingTime
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
            multiplayerIndex: payload.multiplayerIndex,
          })
        )
      }
    })
  }, [socket, isCorrect])

  useEffect(() => {
    if (socket) {
      socket.on("joinRoom", (id) => {
        const _peerIds = peerIds.concat(id)
        console.log("🚀 ~ file: Room.js ~ line 324 ~ socket.on ~ _peerIds", _peerIds)
        setPeerIds(_peerIds)
      })
    }
    // eslint-disable-next-line
  }, [socket])

  // join room
  useEffect(() => {
    if (socket && peerId) {
      socket.emit("joinRoom", {
        peerId,
        roomId: roomId
      })
      console.log(peerId)
    }
  }, [socket, peerId])

  // generate peer id
  useEffect(() => {
    if (peer) {
      peer.on("open", (id) => {
        setPeerId(id)
      })
    }
  }, [peer])

  // do call
  useEffect(() => {
    if (peer !== null && peerIds.length > 0 && peerIds[0] !== peerId) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true }) // true
        .then((stream) => {
          myVideo.current.srcObject = stream
          const call = peer.call(peerIds[0], stream)
          call.on("stream", (remoteStream) => {
            partnerVideo.current.srcObject = remoteStream
          })
        })
        .catch((err) => {
          console.log("🚀 ~ file: Room.js ~ line 72 ~ useEffect ~ err", err)
        })
    }
    // eslint-disable-next-line
  }, [peerIds])

  // answer call
  useEffect(() => {
    if (peer) {
      peer.on("call", (call) => {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            myVideo.current.srcObject = stream
            call.answer(stream) // Answer the call with an A/V stream.
            call.on("stream", (remoteStream) => {
              partnerVideo.current.srcObject = remoteStream
            })
            call.on("close", () => {
              partnerVideo.current.srcObject = null
            })
          })
          .catch((err) => {
            console.log("🚀 ~ file: Room.js ~ line 91 ~ peer.on ~ err", err)
          })
      })
    }
  }, [peer])
  useEffect(() => {
    dispatch(fetchWords())
  }, [])

  useEffect(() => {
    setLocalWords(words)
  }, [words])

  return (
    <>
      {/* {play === false &&
        <div>
          <NavLink to="/multiplayer">back</NavLink>
          <p>
            Room Full
          </p>
        </div>
      } */}

      {play === true && (
        <>
          {wait === false && (
            <>
              <div className="flex flex-col items-center">
                <div className="flex justify-between w-3/5">
                  <video
                    className="mt-16 w-[210px] h-[160px] border-4 border-yellow-400 rounded-lg bg-yellow-200"
                    playsInline
                    ref={myVideo}
                    autoPlay
                    muted
                  />
                  <div className="h-6 mt-12 text-white flex justify-center items-center mx-auto bg-rose-500 bg-opacity-80 w-fit p-6 rounded-xl shadow-lg flex-col">
                    <p>Room Id : {roomId}</p>
                    <p>Guess {remainingGuess} of 6</p>
                  </div>

                  <video
                    className="mt-16 w-[210px] h-[160px] border-4 border-yellow-400 rounded-lg bg-yellow-200"
                    playsInline
                    ref={partnerVideo}
                    autoPlay
                  />
                </div>
                <div className="-mt-40">
                  <Timer
                    isCorrect={isCorrect}
                    remainSeconds={remainSeconds}
                    setRemainSeconds={setRemainSeconds}
                    setTimeup={setTimeup}
                    setLose={setLose}
                  />
                </div>
                {yourTurn !== "" && (
                  <h1 className="-mt-4 text-white bg-rose py-1 px-2 rounded-lg bg-rose-500">
                    {yourTurn}
                  </h1>
                )}
                {yourTurn === "" && (
                  <h1 className="-mt-4 text-white bg-rose py-1 px-2 rounded-lg bg-transparent">
                    turn
                  </h1>
                )}

                <div className="flex w-[100%] justify-center items-center space-x-4 mb-4 mt-4">
                  <form
                    className="flex justify-center items-center gap-2 w-[60%]"
                    onSubmit={handleSubmitAnswer}
                  >
                    <input
                      autoComplete="off"
                      className="bg-yellow-400 border-b-4 border-yellow-400 focus:border-orange-500 duration-300 rounded-lg outline-none w-[90%] h-12 text-black placeholder:text-gray-500 font-medium text-center text-xl"
                      type={"text"}
                      id="inputChat"
                      name="answer"
                    />
                    <button
                      className="text-white bg-orange-500 px-4 h-12 rounded-lg hover:scale-[1.2] hover:bg-white hover:text-orange-500 duration-300 shadow-md"
                      type={"submit"}
                      id="sendButton"
                    >
                      Send
                    </button>
                  </form>
                </div>

                <button
                  className="py-1 px-2 w-16 mb-4 justify-center items-center bg-orange-500 rounded-lg text-white hover:bg-white hover:text-orange-500 hover:scale-150 duration-300 mt-[1px] font-medium shadow-md"
                  onClick={() => setHint(true)}
                >
                  Hint
                </button>

                {/* //? hint */}
                <Transition
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  appear
                  show={hint}
                  as={Fragment}
                >
                  <Dialog as="div" className="relative z-10" onClose={close}>
                    <div className="fixed inset-0 bg-black bg-opacity-25" />

                    <div className="fixed inset-0 overflow-y-auto mx-auto w-auto">
                      <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left flex flex-col items-center shadow-xl transition-all">
                          {/* //? solution image */}
                          {localSolution && (
                            <div className="w-full flex flex-col items-center">
                              {/* //? solution name */}
                              <h2 className="text-violet-700 text-center font-thin font-mono text-base mt-4">
                                {localSolution.clue}
                              </h2>
                            </div>
                          )}
                          {/* //? num of guesses */}

                          <div className="mt-4 w-full flex justify-center">
                            <button type="button" onClick={() => setHint(false)}>
                              close
                            </button>
                          </div>
                        </Dialog.Panel>
                      </div>
                    </div>
                  </Dialog>
                </Transition>

                {rooms.pastAnswers.length > 0 && (
                  <div className="bg-black w-[60%] bg-opacity-70 rounded-lg py-4">
                    <table className="table-fixed w-3/4 text-center mx-auto text-white">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>From</th>
                          <th>ClocalSolutionolor</th>
                          <th>Flavor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rooms.pastAnswers.map((el, i) => {
                          return (
                            <tr key={`uniquekey${i}`} className="h-16">
                              {/* if el.isCorrect false show red color */}
                              {/* if el.isCorrect true show green color */}
                              <td>{el.name.value}</td>
                              {el.location.value == localSolution.location ? (
                                <td className="bg-emerald-500 bg-opacity-60 rounded-l-lg">
                                  {el.location.value}
                                </td>
                              ) : (
                                <td className="bg-rose-500 bg-opacity-60 rounded-l-lg">
                                  {el.location.value}
                                </td>
                              )}
                              {el.color.value == localSolution.color ? (
                                <td className="bg-emerald-500 bg-opacity-60">{el.color.value}</td>
                              ) : (
                                <td className="bg-rose-500 bg-opacity-60">{el.color.value}</td>
                              )}
                              {el.taste.value == localSolution.taste ? (
                                <td className="bg-emerald-500 bg-opacity-60 rounded-r-lg">
                                  {el.taste.value}
                                </td>
                              ) : (
                                <td className="bg-rose-500 bg-opacity-60 rounded-r-lg">
                                  {el.taste.value}
                                </td>
                              )}
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* //* Win Modal */}
              <Transition
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                appear
                show={open}
                as={Fragment}
              >
                <Dialog as="div" className="relative z-10" onClose={close}>
                  <div className="fixed inset-0 bg-black bg-opacity-25" />

                  <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left flex flex-col items-center shadow-xl transition-all">
                        {/* //? solution image */}
                        {localSolution && (
                          <div className="w-full flex flex-col items-center">
                            <img
                              src={localSolution.imgUrl}
                              className="h-36 w-36 rounded-lg mb-6 shadow-lg"
                            />
                            <div className="border-b-2 border-indigo-400 w-full mb-6"></div>
                            <Dialog.Title
                              as="h3"
                              className="text-2xl text-center font-medium leading-6 text-[#6A67CE]"
                            >
                              Congrats!
                            </Dialog.Title>
                            {/* //? solution name */}
                            <h2 className="text-violet-700 text-center font-semibold text-xl mt-4">
                              {localSolution.name}
                            </h2>
                          </div>
                        )}
                        {/* //? num of player guesses */}
                        <div className="my-4 text-center flex justify-evenly w-full">
                          <div className="flex flex-col bg-opacity-80 shadow-xl bg-violet-700 w-20 h-20 rounded-full justify-center">
                            <h1 className="text-violet-200 text-xs">Attempt(s)</h1>
                            <p className="text-xl text-violet-100 font-semibold">
                              {rooms.remainingGuess}
                            </p>
                          </div>
                          {/* //? duration */}
                          <div className="flex flex-col bg-opacity-80 shadow-xl bg-violet-700 text-violet-100 w-20 h-20 rounded-full justify-center">
                            <h1 className="text-xs">Time</h1>

                            {Math.floor((300 - result.remainingTime) / 60) > 0 && (
                              <p className="text-xl font-semibold">
                                {Math.floor((300 - result.remainingTime) / 60)}
                                <span className="text-sm">m </span>
                                {(300 - result.remainingTime) % 60}
                                <span className="text-sm">s</span>
                              </p>
                            )}
                            {Math.floor((300 - result.remainingTime) / 60) ===
                              0 && (
                              <p className="text-xl font-semibold">
                                {(300 - result.remainingTime) % 60}
                                <span className="text-sm font-thin">s</span>
                              </p>
                            )}
                          </div>
                          {/* //? score */}
                          <div className="flex flex-col bg-opacity-80 shadow-xl bg-violet-700 w-20 h-20 rounded-full justify-center">
                            <h1 className="text-violet-200 text-xs">Score</h1>
                            <p className="text-xl text-violet-100 font-semibold">
                              {result.score}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 w-full flex justify-center">{goBackHome()}</div>
                      </Dialog.Panel>
                    </div>
                  </div>
                </Dialog>
              </Transition>

              {/* //! Modal lose */}
              <Transition
                appear
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                show={lose}
                as={Fragment}
              >
                <Dialog as="div" className="relative z-10" onClose={close}>
                  <div className="fixed inset-0 bg-black bg-opacity-25" />

                  <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left flex flex-col items-center shadow-xl transition-all">
                        <Dialog.Title
                          as="h1"
                          className="text-3xl text-center mb-4 leading-6 text-rose-600"
                        >
                          Game Over
                        </Dialog.Title>
                        {localSolution && (
                          <div className="font-mono w-full flex flex-col text-indigo-600 items-center">
                            {/* //? solution image */}
                            <img
                              src={localSolution.imgUrl}
                              className="h-36 w-36 rounded-lg mb-6 shadow-lg"
                            />
                            <h2>The answer is</h2>
                            {/* //? solution name */}
                            <h2 className="text-[30px] ">{localSolution.name}</h2>
                          </div>
                        )}
                        {/* //? num of guesses */}

                        <div className="mt-4 w-full flex justify-center">{goBackHome()}</div>
                      </Dialog.Panel>
                    </div>
                  </div>
                </Dialog>
              </Transition>

              {/* //? Modal out of time */}
              <Transition
                appear
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                show={timeup}
                as={Fragment}
              >
                <Dialog as="div" className="relative z-10" onClose={close}>
                  <div className="fixed inset-0 bg-black bg-opacity-25" />

                  <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left flex flex-col items-center shadow-xl transition-all">
                        {/* //? solution image */}
                        <Dialog.Title
                          as="h1"
                          className="text-3xl text-center mb-4 leading-6 text-rose-600"
                        >
                          Time's up!
                        </Dialog.Title>
                        {localSolution && (
                          <div className="font-mono w-full flex flex-col text-indigo-600 items-center">
                            <img
                              src={localSolution.imgUrl}
                              className="h-36 w-36 rounded-lg mb-6 shadow-lg"
                            />
                            {/* //? solution name */}
                            <h2>The answer is</h2>
                            <h2 className="text-[30px] ">{localSolution.name}</h2>
                          </div>
                        )}
                        {/* //? num of guesses */}

                        <div className="mt-4 w-full flex justify-center">{goBackHome()}</div>
                      </Dialog.Panel>
                    </div>
                  </div>
                </Dialog>
              </Transition>

              {/* //! word not found */}
              <Transition
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                appear
                show={wrong}
                as={Fragment}
              >
                <Dialog as="div" className="relative z-10" onClose={close}>
                  <div className="fixed inset-0 bg-black bg-opacity-25" />

                  <div className="fixed inset-0 overflow-y-auto mx-auto w-48 ">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left flex flex-col items-center shadow-xl transition-all">
                        <h2 className="text-violet-700 text-center font-thin font-mono text-base mt-4">
                          invalid word
                        </h2>

                        <div className="mt-4 w-full flex justify-center">
                          <button type="button" onClick={() => setWrong(false)}>
                            close
                          </button>
                        </div>
                      </Dialog.Panel>
                    </div>
                  </div>
                </Dialog>
              </Transition>
            </>
          )}

          {wait === true && (
            <>
              <div className="flex justify-center items-center mx-auto my-48 bg-yellow-500 w-fit p-6 rounded-xl shadow-2xl flex-col">
                <p className="text-white font-semibold my-4">Waiting Another Player</p>
                <p className="text-white font-semibold">Room Code: {roomId}</p>

                <CopyToClipboard text={roomId}>
                  <button
                    className="px-6
            h-8
            bg-orange-500
            text-white
            font-medium
            leading-tight
            rounded
            shadow-md
            hover:bg-orange-700 hover:shadow-lg
            active:bg-orange-800 active:shadow-lg
            transition
            duration-150
            ease-in-out
            my-4
          "
                  >
                    Copy
                  </button>
                </CopyToClipboard>
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}

export default MultiPlayerRoom
