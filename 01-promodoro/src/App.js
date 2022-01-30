import React, { useRef, useState } from 'react';
import './App.css';

// Add extra zero at the begining of the min/sec
function padTime(time) {
  return time.toString().padStart(2, '0');
}

function App() {
  const [title, setTitle] = useState('Let the countdown begin!!!');
  const [timeLeft, setTimeLeft] = useState(15);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // function
  function startTimer() {
    // Check if the timer is already runing then don't do anything
    if (intervalRef.current !== null) return;

    setTitle(`You're doing great!`);
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTimeLeft(timeLeft => {
        if (timeLeft >= 1) return timeLeft - 1;
        // reset the timer
        resetTimer();
        return 0;
      });
    }, 1000)
  }

  // reset interval
  function stopTimer() {
    // check if the timer is already stopped then don't do anything
    if (intervalRef.current === null) return;

    clearInterval(intervalRef.current);
    setTitle('Keep it up!');
    setIsRunning(false);
  }

  function resetTimer() {
    clearInterval(intervalRef.current);
    setTimeLeft(25 * 60);
    setTitle('Ready to go another round?');
  }

  // calculation
  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  return (
    <div className="app">
      <h2>{ title }</h2>

      <div className="timer">
        <span>{ minutes }</span>
        <span>:</span>
        <span>{ seconds }</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={ startTimer }>Start</button>}
        {isRunning && <button onClick={ stopTimer }>Stop</button>}
        <button onClick={ resetTimer }>Reset</button>
      </div>
    </div>
  );
}

export default App;
