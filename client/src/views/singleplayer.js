import React from "react";
import {} from "../store/actions/singlePlayerActions";
// import { useDispatch, useSelector } from "react-redux";
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
    ingredients: "cocconut",
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
  name: "test3",
  location: "paret",
  color: "brown",
  ingredients: "cocconut",
  taste: "bitter",
  clue: "food",
};
const Singleplayer = () => {
  const [answer, setAnswer] = React.useState("");
  const [guesses, setGuesses] = React.useState(6);
  const [pastAnswers, setPastAnswers] = React.useState([]);
  const [isCorrect, setIsCorrect] = React.useState(false);
  function answerHandler(e) {
    setAnswer(e.target.value);
  }
  function onEnter(e) {
    // user can only submit if answer is truthy and guesses are above 0
    if (e.key === "Enter" && answer && guesses > 0) {
      const remainingGuesses = guesses - 1;
      setGuesses(remainingGuesses);
      // when the user has guessed the user's remaining guesses is stored in localStorage
      // if user reloads the page, he/she will still have the same number of remaining guesses
      localStorage.setItem("user_guesses", remainingGuesses);
      const userGuess = mockData.find((el) => el.name === answer);
      if (userGuess) {
        const keys = Object.keys(userGuess);
        const obj = {};
        let allCorrect = true;
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (userGuess[key] !== food[key]) {
            obj[key] = {
              value: userGuess[key],
              isCorrect: false,
            };
            allCorrect = false;
          } else {
            obj[key] = {
              value: userGuess[key],
              isCorrect: true,
            };
          }
        }
        const temp = [...pastAnswers, obj];
        setPastAnswers(temp);
        localStorage.setItem("pastAnswers", JSON.stringify(temp));
        if (allCorrect) setIsCorrect(true);
      } else {
        // if the user's answer does not exist do something
        console.log("food does not exist");
      }
    }
  }
  React.useEffect(() => {
    // If user is correct do something
    if (isCorrect) {
      console.log("food is correct");
    }
  }, [isCorrect]);
  return (
    <>
      {/*User Input */}
      <div>
        {/* User can only submit when answer is truthy */}
        {/* User can submit using the Enter key (handled by the onEnter function) */}
        <input type="text" onChange={answerHandler} onKeyPress={onEnter} />
      </div>
      <div>
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
                <span>Clue {el.taste.clue}</span>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default Singleplayer;
