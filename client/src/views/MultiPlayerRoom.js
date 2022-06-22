import { useState, useEffect } from "react"
import { NavLink, useParams } from 'react-router-dom';
import { fetchWords } from "../stores/actions/wordAction.js";
import Timer from "../components/Timer.js";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard"

function MultiPlayerRoom({ socket }) {
  const dispatch = useDispatch();
  const { words } = useSelector((state) => state.words);
  const { roomId } = useParams();
  const rooms = JSON.parse(localStorage.getItem("rooms"));
  const [answer, setAnswer] = useState("");
  const [correct, setCorrect] = useState("");
  const [gameEnd, setGameEnd] = useState(false);
  const [remainingGuess, setRemainingGuess] = useState(0);
  const [message, setMessage] = useState("");
  const [pastAnswers, setPastAnswers] = useState([]);
  const [yourTurn, setYourTurn] = useState(false)
  const [wait, setWait] = useState(true)
  const [roomFull, setRoomFull] = useState(false)
  const [play, setPlay] = useState(false)
  const [localWords, setLocalWords] = useState([]);
  const [localSolution, setLocalSolution] = useState("");
  const mainKeys = Object.keys(words[0])
  const [copiedRoomId, setCopiedRoomId] = useState("")

  // timer
  const [isCorrect, setIsCorrect] = useState(false);
  const [remainSeconds, setRemainSeconds] = useState(0);

  function handleSubmitAnswer(event) {
    event.preventDefault()
    let inputAnswer = event.target.answer.value
    console.log(inputAnswer);
    let currentGuess = rooms.remainingGuess
    let tempCurrentuser = ""
    tempCurrentuser = localStorage.getItem("username")
    let solution = words[rooms.multiplayerIndex]
    console.log(words, rooms.multiplayerIndex, "me submit");
    const payload = {
      roomId: roomId,
      wordGuess: inputAnswer,
      remainingGuess: currentGuess,
      pastAnswers: rooms.pastAnswers,
      currentPlayer: tempCurrentuser,
      multiplayerIndex: rooms.multiplayerIndex
    }

    if (!gameEnd && currentGuess < 6) {

      if (rooms.currentPlayer === tempCurrentuser) {
        setMessage("Wait another player")
        setTimeout(() => {
          setMessage("")
        }, 3000)

      } else if (rooms.currentPlayer === null || rooms.currentPlayer !== tempCurrentuser) {
        setAnswer(inputAnswer)

        const userGuess = words.find(
          (el) => el.name.toLowerCase() === inputAnswer.toLowerCase()
        );

        if (userGuess !== undefined) {
          const keys = Object.keys(userGuess);
          const obj = {};
          keys.forEach((key) => {
            if (userGuess[key] !== solution[key]) {
              obj[key] = {
                value: userGuess[key],
                isCorrect: false
              }
            } else {
              obj[key] = {
                value: userGuess[key],
                isCorrect: true
              }
            }
          })

          if (inputAnswer.toLowerCase() !== solution.name.toLowerCase()) {
            currentGuess += 1;
            payload.remainingGuess = currentGuess
            console.log(currentGuess);
            setCorrect(inputAnswer + " is incorrect")
          } else {
            currentGuess += 1;
            payload.remainingGuess = currentGuess
            setCorrect(inputAnswer + " is correct")
            setGameEnd(true)
            setIsCorrect(true);
          }

          payload.pastAnswers = [...payload.pastAnswers, obj]

          localStorage.setItem("rooms", JSON.stringify(
            payload
          ))

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
      };
    }
    return {
      border: "1px solid",
    };
  }

  useEffect(() => {
    socket.on("joinedWaitingRoom", (payload) => {
     console.log(payload);
      if (payload.totalUser <= 2) {
        setPlay(true)
      }

      if (payload.totalUser === 2) {
        localStorage.setItem("rooms", JSON.stringify({
          roomId: roomId,
          wordGuess: "",
          remainingGuess: 0,
          pastAnswers: [],
          currentPlayer: null,
          multiplayerIndex: payload.randomIndex
        }))
        setWait(false)

      } else if (payload > 2) {
        setRoomFull(true)
        setPlay(false)
      }
    })

    socket.on("backAnswer", (payload) => {
      setAnswer(payload.wordGuess)
      setRemainingGuess(payload.remainingGuess)
      let solution = words[payload.multiplayerIndex]
      console.log(words, payload.multiplayerIndex, solution, "another user submit");
      if (payload.remainingGuess === 6) {
        setGameEnd(true);
        setMessage("The rest of the guesses run out");
      }

      if (payload.wordGuess.toLowerCase() !== solution.name.toLowerCase()) {
        setCorrect(payload.wordGuess + " is incorrect");
      } else {
        setCorrect(payload.wordGuess + " is correct");
        setGameEnd(true);
        setIsCorrect(true);
      }
      if (!gameEnd) {
        localStorage.setItem("rooms", JSON.stringify({
          roomId: payload.roomId,
          wordGuess: payload.wordGuess,
          remainingGuess: payload.remainingGuess,
          pastAnswers: payload.pastAnswers,
          currentPlayer: payload.currentPlayer,
          multiplayerIndex: payload.multiplayerIndex
        }))
      }
    })
  }, [socket, isCorrect])

  useEffect(() => {
    dispatch(fetchWords());
  }, [])

  useEffect(() => {
    setLocalWords(words)
  }, [words])

  return (
    <>

      {play === false&&
        <div>
          <NavLink to="/multiplayer">back</NavLink>
          <p>
            Room Full
          </p>
        </div>
      }

      {play === true &&
        <>
          {wait === false &&
            <>
              <div>
                <Timer
                  isCorrect={isCorrect}
                  remainSeconds={remainSeconds}
                  setRemainSeconds={setRemainSeconds}
                ></Timer>
                <p>Room Id : {roomId}</p>
                <label>Answer : {answer}</label>
                <span id="answer"></span>
                <h1>{correct}</h1>


                <p>Guess {remainingGuess} of 6</p>
                <p id="error"></p>
                <form onSubmit={handleSubmitAnswer}>
                  <input type={"text"} id="inputChat" name="answer" />
                  <button type={"submit"} id="sendButton">Send</button>
                </form>
                <h1 style={{ border: "1px solid" }}>{message}</h1>

                <div>
                  <table style={{ border: "1px solie", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        {
                          mainKeys.map((mainKey, i) => {
                            return (
                              <th scope="col" key={i} style={{ border: "1px solid" }}>{mainKey}</th>
                            )
                          })
                        }
                      </tr>

                    </thead>
                    <tbody>
                      {
                        rooms.pastAnswers.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td style={evaluating(item.id.isCorrect)}>{item.id.value}</td>
                              <td style={evaluating(item.name.isCorrect)}>{item.name.value}</td>
                              <td style={evaluating(item.location.isCorrect)}>{item.location.value}</td>
                              <td style={evaluating(item.color.isCorrect)}>{item.color.value}</td>
                              <td style={evaluating(item.ingredient.isCorrect)}>{item.ingredient.value}</td>
                              <td style={evaluating(item.taste.isCorrect)}>{item.taste.value}</td>
                              <td style={evaluating(item.clue.isCorrect)}>{item.clue.value}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>

                <h1>{yourTurn}</h1>
              </div>
            </>
          }

          {wait === true &&
            <>
              <p>Room Id : {roomId}</p>
              <CopyToClipboard text={roomId}>
                <button>Copy</button>
              </CopyToClipboard>
              <p>Waiting another player</p>
            </>
          }
        </>
      }
    </>
  );
}

export default MultiPlayerRoom;

