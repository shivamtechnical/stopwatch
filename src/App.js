import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [elapsed, setElapsed] = useState(0);
  const [isRuning, setIsRuning] = useState(false);
  const [lapTime, setLapTime] = useState([]);
  const intervalRef = useRef(null);

  const startStopwatch = () => {
    if (isRuning) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - elapsed;

      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - startTime);
      }, 100);
    }
    setIsRuning(!isRuning);
  };

  const resetStopWatch = () => {
    clearInterval(intervalRef.current);
    setElapsed(0);
    setIsRuning(false);
    setLapTime([]);
  };

  const record = () => {
    setLapTime((prevLapTime) => [...prevLapTime, formatTime(elapsed)]);
  };

  const formatTime = (time) => {
    const minute = Math.floor(time / 60000);
    const second = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 100);

    return (
      String(minute).padStart(2, "0") +
      ":" +
      String(second).padStart(2, "0") +
      ":" +
      String(milliseconds).padStart(2, "0")
    );
  };

  return (
    <div className="container">
      <div className="time">{formatTime(elapsed)}</div>
      <div>
        <button className="button" onClick={startStopwatch}>
          {isRuning ? "stop" : "Start"}
        </button>
        <button className=" button" onClick={resetStopWatch}>
          restart
        </button>

        <button className="button" onClick={record}>
          Lap
        </button>
      </div>

      {lapTime.length > 0 && (
        <div className="lap">
          <h3>lap times</h3>
          <ul>
            {lapTime.map((laptime, index) => (
              <li key={index}>{`Lap ${index + 1} : ${lapTime[index]}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
