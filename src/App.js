import React from "react";
import Die from "./components/Die";
import Highscores from "./components/Highscores";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [diceArray, setDiceArray] = React.useState(newDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [counter, setCounter] = React.useState(0);
  const [timer, setTimer] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const countRef = React.useRef(null);
  const [counterHS, setCounterHS] = React.useState(
    localStorage.getItem("counterHS") || 1000
  );
  const [minutesHS, setMinutesHS] = React.useState(
    localStorage.getItem("minutesHS") || 5
  );
  const [secondsHS, setSecondsHS] = React.useState(
    localStorage.getItem("secondsHS") || 60
  );

  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);

  function newDieInd() {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    const newDie = {
      value: randomNumber,
      isHeld: false,
      id: nanoid(),
    };
    return newDie;
  }

  function newDice() {
    const newDiceArray = [];
    for (let i = 0; i < 10; i++) {
      const newDie = newDieInd();
      newDiceArray.push(newDie);
    }
    return newDiceArray;
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false);
      setDiceArray(newDice());
      setCounter(0);
      clearInterval(countRef.current);
      setIsActive(false);
      setIsPaused(false);
      setTimer(0);
    } else {
      setDiceArray((prevDiceArray) =>
        prevDiceArray.map((die) => {
          if (die.isHeld) {
            return die;
          } else {
            return newDieInd();
          }
        })
      );
      setCounter((prevCounter) => prevCounter + 1);
      if (counter === 0) {
        setIsActive(true);
        setIsPaused(true);
        countRef.current = setInterval(() => {
          setTimer((timer) => timer + 1);
        }, 1000);
      }
    }
  }

  function dieClick(id) {
    setDiceArray((prevDiceArray) =>
      prevDiceArray.map((die) => {
        if (die.id === id) {
          return {
            ...die,
            isHeld: !die.isHeld,
          };
        } else {
          return die;
        }
      })
    );
  }

  React.useEffect(() => {
    const firstValue = diceArray[0].value;
    if (
      diceArray.every((die) => die.isHeld) &&
      diceArray.every((die) => die.value === firstValue)
    ) {
      setTenzies(true);
      clearInterval(countRef.current);
      setIsPaused(false);
      if (counter < counterHS) {
        setCounterHS(counter);
      }
      localStorage.setItem("counterHS", counterHS);
      const minutes = parseInt(getMinutes);
      const seconds = parseInt(getSeconds);
      if (minutes <= minutesHS) {
        if (seconds < secondsHS) {
          setMinutesHS(minutes);
          setSecondsHS(seconds);
        }
      }
      localStorage.setItem("minutesHS", minutesHS);
      localStorage.setItem("secondsHS", secondsHS);
    }
  }, [
    diceArray,
    counter,
    counterHS,
    getMinutes,
    getSeconds,
    minutesHS,
    secondsHS,
  ]);

  const dieElements = diceArray.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      click={() => dieClick(die.id)}
    />
  ));

  return (
    <div className="game">
      <Highscores
        counter={counter}
        seconds={getSeconds}
        minutes={getMinutes}
        counterHS={counterHS}
        minutesHS={minutesHS}
        secondsHS={secondsHS}
      />
      <div className="main">
        {tenzies && <Confetti />}
        <h1 className="game-title">Tenzies</h1>
        <h3 className="game-instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls. Counter and timer start after first roll.
        </h3>
        <div className="dice-container">{dieElements}</div>
        <button className="game-btn" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </div>
    </div>
  );
}

export default App;
