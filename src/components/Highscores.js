import React from "react";

function Highscores(props) {
  var minutes = props.minutesHS;
  var seconds = props.secondsHS;

  console.log(minutes);
  console.log(seconds);

  if (minutes.length === 1) {
    minutes = `0` + minutes;
  }
  if (seconds.length === 1) {
    seconds = `0` + seconds;
  }

  return (
    <div className="highscores">
      <h1 className="highscores-title">Highscores</h1>
      <div className="counter-container">
        <div className="counter-title">C o u n t e r</div>
        <div className="counter-hs">{props.counterHS}</div>
        <div className="counter">{props.counter}</div>
      </div>
      <div className="timer-container">
        <div className="timer-title">T i m e r</div>
        <div className="timer-hs">
          {minutes}:{seconds}
        </div>
        <div className="timer">
          {props.minutes}:{props.seconds}
        </div>
      </div>
    </div>
  );
}

export default Highscores;
