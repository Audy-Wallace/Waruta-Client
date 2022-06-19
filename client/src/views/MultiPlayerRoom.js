import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import { connectSocket } from "../hooks/connectSocket.js"
import Timer from "../components/timer.js";

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
];

const food = {
  name: "test1",
  location: "mars",
  color: "white",
  ingredients: "santan",
  taste: "salty",
  clue: "food",
}

function MultiPlayerRoom() {
  const socket = connectSocket();
  const { roomId } = useParams();
  const rooms = JSON.parse(localStorage.getItem("rooms"))
  const [answer, setAnswer] = useState("")
  const [correct, setCorrect] = useState("")
  const [gameEnd, setGameEnd] = useState(false)
  const [remainingGuess, setRemainingGuess] = useState(0)
  const [message, setMessage] = useState("")
  const [pastAnswers, setPastAnswers] = useState([]);
  const mainKeys = Object.keys(food)

  // timer
  const [isCorrect, setIsCorrect] = useState(false);
  const [remainSeconds, setRemainSeconds] = useState(0);

  socket.emit("connecting",
    {
      roomId: roomId,
      wordGuess: {},
      remainingGuess: 0,
      pastAnswers: []
    })

  function handleSubmitAnswer(event) {
    event.preventDefault()

    let inputAnswer = event.target.answer.value
    setAnswer(inputAnswer)
    let currentGuess = rooms.remainingGuess
    const payload = {
      roomId: roomId,
      wordGuess: inputAnswer,
      remainingGuess: currentGuess,
      pastAnswers: rooms.pastAnswers
    }
    console.log(payload);

    if (!gameEnd && currentGuess < 6) {
      const userGuess = mockData.find((el) => el.name === inputAnswer);
      console.log(userGuess);

      if (userGuess !== undefined) {
        const keys = Object.keys(userGuess);
        const obj = {};
        let allCorrect = true;
        keys.forEach((key) => {
          if (userGuess[key] !== food[key]) {
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

        if (inputAnswer !== food.name) {
          currentGuess += 1;
          payload.remainingGuess = currentGuess
          console.log(currentGuess);
          // setCorrect(inputAnswer + " is incorrect")
        } else {
          currentGuess += 1;
          payload.remainingGuess = currentGuess
          setCorrect(inputAnswer + " is correct")
          setGameEnd(true)
          setIsCorrect(true);
        }

        payload.pastAnswers = [...payload.pastAnswers, obj]
        console.log(payload, ">>>>>>>>");

        localStorage.setItem("rooms", JSON.stringify(
          payload
        ))

        socket.emit("hitAnswer", payload)
      } else {
        setMessage(inputAnswer + " does not exist")
      }

    } else {
      setGameEnd(true)
    }
    setRemainingGuess(currentGuess)
    // event.target.answer.value = ""
  }

  function evaluating(isCorrect) {
    if (isCorrect) {
      return {
        border: "1px solid",
        backgroundColor: "lightgreen"
      }
    }
    return {
      border: "1px solid"
    }
  }

  useEffect(() => {
    socket.on("connecting", (payload) => {
      console.log("berhasil");
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
        setCorrect(payload.wordGuess + " is correct")
        setGameEnd(true)
        setIsCorrect(true);
      }
      if(!gameEnd) {
        localStorage.setItem("rooms", JSON.stringify({
          roomId: payload.roomId,
          wordGuess: payload.wordGuess,
          remainingGuess: payload.remainingGuess,
          pastAnswers: payload.pastAnswers
        }))
      }
    })
  }, [socket])

  return (
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
                      <td style={evaluating(item.name.isCorrect)}>{item.name.value}</td>
                      <td style={evaluating(item.location.isCorrect)}>{item.location.value}</td>
                      <td style={evaluating(item.color.isCorrect)}>{item.color.value}</td>
                      <td style={evaluating(item.ingredients.isCorrect)}>{item.ingredients.value}</td>
                      <td style={evaluating(item.taste.isCorrect)}>{item.taste.value}</td>
                      <td style={evaluating(item.clue.isCorrect)}>{item.clue.value}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>
      </div>
    </>
  )
}

export default MultiPlayerRoom