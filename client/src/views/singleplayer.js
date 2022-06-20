import React, { useEffect } from "react";
import { fetchWords } from "../stores/actions/wordAction";
import { useDispatch, useSelector } from "react-redux";
import Timer from "../components/Timer";
import Voice from "../components/Voice";
const Singleplayer = () => {
  const dispatch = useDispatch();
  const { words, solution } = useSelector((state) => state.words);
  const [answer, setAnswer] = React.useState("");
  const [guesses, setGuesses] = React.useState(6);
  const [pastAnswers, setPastAnswers] = React.useState([]);
  const [isCorrect, setIsCorrect] = React.useState(false);
  const [localWords, setLocalWords] = React.useState([]);
  const [localSolution, setLocalSolution] = React.useState("");
  const [remainSeconds, setRemainSeconds] = React.useState(0);
  const [userScore, setUserScore] = React.useState(0);
  const [ answerByVoice, setAnswerByVoice] = React.useState(false);

  function answerHandler(e) {
    setAnswer(e.target.value);
  }

  function answerVoice(finalTranscript) {
    // transcript = transcript.slice(0, (transcript.length - 1))
    finalTranscript = finalTranscript.replace('.', '')
    if(finalTranscript == "11") {finalTranscript = "Seblak"}
    setAnswer(finalTranscript)
    setAnswerByVoice(true)
    // console.log(answer, "<<<<ANSWER")
    // autoEnter()
  }

  useEffect(() => {
    if(answerByVoice) {
      autoEnter()
      setAnswerByVoice(false)
    }
  }, [answerByVoice])

  function autoEnter() {
    if (answer && guesses > 0) {
      const remainingGuesses = guesses - 1;
      console.log(remainingGuesses, "REMAINING GUESSES")
      setGuesses(remainingGuesses);
      // when the user has guessed the user's remaining guesses is stored in localStorage
      // if user reloads the page, he/she will still have the same number of remaining guesses
      localStorage.setItem("user_guesses", remainingGuesses);
      console.log(answer, "ANSWER")
      const userGuess = localWords.find(
        (el) => el.name.toLowerCase() === answer.toLowerCase()
      );
      if (userGuess) {
        const keys = Object.keys(userGuess);
        const obj = {};
        let allCorrect = true;
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (key === "id") continue;
          if (
            userGuess.name.toLowerCase() !== localSolution.name.toLowerCase()
          ) {
            obj[key] = {
              value: userGuess[key],
              isCorrect: false,
            };
            allCorrect = false;
            continue;
          }
          if (userGuess[key] !== localSolution[key]) {
            obj[key] = {
              value: userGuess[key],
              isCorrect: false,
            };
            allCorrect = false;
            continue;
          }
          obj[key] = {
            value: userGuess[key],
            isCorrect: true,
          };
        }
        const temp = [...pastAnswers, obj];
        setPastAnswers(temp);
        localStorage.setItem("pastAnswers", JSON.stringify(temp));
        if (allCorrect) setIsCorrect(true);
      } else {
        // if the user's answer does not exist do something
        console.log("food does not exist");
      }
      setAnswer("");
    }
  }
  function onEnter(e) {
    // user can only submit if answer is truthy and guesses are above 0
    if (e.key === "Enter" && answer && guesses > 0) {
      const remainingGuesses = guesses - 1;
      console.log(remainingGuesses)
      setGuesses(remainingGuesses);
      // when the user has guessed the user's remaining guesses is stored in localStorage
      // if user reloads the page, he/she will still have the same number of remaining guesses
      localStorage.setItem("user_guesses", remainingGuesses);
      const userGuess = localWords.find(
        (el) => el.name.toLowerCase() === answer.toLowerCase()
      );
      if (userGuess) {
        const keys = Object.keys(userGuess);
        const obj = {};
        let allCorrect = true;
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (key === "id") continue;
          if (
            userGuess.name.toLowerCase() !== localSolution.name.toLowerCase()
          ) {
            obj[key] = {
              value: userGuess[key],
              isCorrect: false,
            };
            allCorrect = false;
            continue;
          }
          if (userGuess[key] !== localSolution[key]) {
            obj[key] = {
              value: userGuess[key],
              isCorrect: false,
            };
            allCorrect = false;
            continue;
          }
          obj[key] = {
            value: userGuess[key],
            isCorrect: true,
          };
        }
        const temp = [...pastAnswers, obj];
        setPastAnswers(temp);
        localStorage.setItem("pastAnswers", JSON.stringify(temp));
        if (allCorrect) setIsCorrect(true);
      } else {
        // if the user's answer does not exist do something
        console.log("food does not exist");
      }
      setAnswer("");
    }
  }
  React.useEffect(() => {
    dispatch(fetchWords());
  }, []);
  React.useEffect(() => {
    // If user is correct do something
    if (isCorrect) {
      console.log("food is correct");
      localStorage.setItem("win", true);
      localStorage.setItem("remainingTime", remainSeconds);
      const totalGuesses = +localStorage.getItem("user_guesses");
      let guessScore;
      switch (totalGuesses) {
        case 5:
          guessScore = 60;
          break;
        case 4:
          guessScore = 50;
          break;
        case 3:
          guessScore = 40;
          break;
        case 2:
          guessScore = 30;
          break;
        case 1:
          guessScore = 20;
          break;
        default:
          guessScore = 10;
          break;
      }
      let timeScore;
      const secondsLeft = +localStorage.getItem("remainingTime");
      console.log(secondsLeft);
      if (secondsLeft >= 240 && secondsLeft <= 300) {
        timeScore = 60;
      } else if (secondsLeft >= 180) {
        timeScore = 50;
      } else if (secondsLeft >= 120) {
        timeScore = 40;
      } else if (secondsLeft >= 60) {
        timeScore = 30;
      } else if (secondsLeft >= 30) {
        timeScore = 20;
      } else if (secondsLeft >= 0) {
        timeScore = 10;
      }
      console.log(timeScore);
      const score = guessScore + timeScore;
      localStorage.setItem("score", score);
    }
    if (isCorrect === false && +localStorage.getItem("user_guesses") === 0) {
      localStorage.setItem("score", 0);
    }
    if (isCorrect === false && +localStorage.getItem("remainingTime") === 0) {
      localStorage.setItem("score", 0);
    }
    console.log(localStorage.getItem("score"));
  }, [isCorrect]);
  React.useEffect(() => {
    setLocalWords(words);
  }, [words]);
  React.useEffect(() => {
    setLocalSolution(solution);
  }, [solution]);
  return (
    <>
      <div>
        <Timer
          isCorrect={isCorrect}
          remainSeconds={remainSeconds}
          setRemainSeconds={setRemainSeconds}
        />
      </div>
      {/*User Input */}
      <div className="flex w-[100%] justify-center items-center">
        {/* User can only submit when answer is truthy */}
        {/* User can submit using the Enter key (handled by the onEnter function) */}
        <input
          type="text"
          onChange={answerHandler}
          onKeyPress={onEnter}
          className="w-[60%] h-12"
          value={answer}
        />
        <Voice answerVoice={answerVoice}></Voice>
      </div>
      <div className="flex flex-col w-[100%] justify-center items-center">
        {localStorage.getItem("pastAnswers") &&
          JSON.parse(localStorage.getItem("pastAnswers")).map((el) => {
            return (
              <div key={`uniquekey${el.name.value}`}>
                {/* if el.isCorrect false show red color */}
                {/* if el.isCorrect true show green color */}
                <span>Name {el.name.value}</span>
                <span>From {el.location.value}</span>
                <span>Color {el.color.value}</span>
                <span>Taste {el.taste.value}</span>
                <span>Clue {el.clue.value}</span>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default Singleplayer;
