import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
export default function Timer({
  isCorrect,
  remainSeconds,
  setRemainSeconds,
  setTimeup,
  setLose
}) {
  const [scoreTime, setScoreTime] = useState(0);

  let time;
  let timeStore;

  if (localStorage.getItem("time")) {
    let prevDate = localStorage.getItem("time");
    timeStore = new Date(prevDate);
  } else {
    time = new Date();
    time.setSeconds(time.getSeconds() + 10); // 5 minutes timer
    localStorage.setItem("time", time);
  }

  let { seconds, minutes, isRunning, start, pause, resume, restart } = useTimer(
    {
      expiryTimestamp: timeStore ? timeStore : time,
      onExpire: () => expiredTime(),
    }
  );

  useEffect(() => {
    setTimeLeft();
    if (
      isCorrect ||
      localStorage.getItem("win") ||
      localStorage.getItem("score") == 0
    ) {
      pause();
      time = new Date();
      time.setSeconds(
        time.getSeconds() + +localStorage.getItem("remainingTime")
      ); // 5 minutes timer
      localStorage.setItem("time", time);
    }
  }, [isCorrect, localStorage.getItem("score")]);
  useEffect(() => {
    setTimeLeft();
  }, [minutes, seconds]);
  function expiredTime() {
    setTimeup(true);
    setLose(true)
    localStorage.removeItem("time");
    setScoreTime(0);
  }
  function checkDigit(menitDetik) {
    if (menitDetik < 10) {
      return `0${menitDetik}`;
    }
    return menitDetik;
  }
  function setTimeLeft() {
    const totalSeconds = minutes * 60 + seconds;
    setRemainSeconds(totalSeconds);
    localStorage.setItem("remainingTime", totalSeconds);
  }
  return (
    <div className="flex w-full justify-center items-center h-48 space-x-4 mt-6">
      {checkDigit(minutes) > 1 && (
        <div className="text-rose-200 shadow-xl text-center flex flex-col justify-center bg-rose-600 bg-opacity-80 w-20 h-20 rounded-full duration-300">
          <h2 className="text-2xl font-semibold">{checkDigit(minutes)}</h2>
          <h2 className="text-xs">minutes</h2>
        </div>
      )}
      {checkDigit(minutes) == 1 && (
        <div className="text-rose-200 shadow-xl text-center flex flex-col justify-center bg-rose-600 bg-opacity-80 w-20 h-20 rounded-full duration-300">
          <h2 className="text-2xl font-semibold">{checkDigit(minutes)}</h2>
          <h2 className="text-xs">minute</h2>
        </div>
      )}
      {checkDigit(minutes) > 0 && (
        <div className="text-rose-200 shadow-xl text-center flex flex-col justify-center bg-rose-600 bg-opacity-80 w-20 h-20 rounded-full duration-300">
          <h2 className="text-2xl font-semibold">{checkDigit(seconds)}</h2>
          <h2 className="text-xs">seconds</h2>
        </div>
      )}
      {checkDigit(minutes) == 0 && (
        <div className="text-rose-200 shadow-xl text-center flex flex-col justify-center bg-rose-600 bg-opacity-80 w-40 h-40 rounded-full duration-300">
          <h2 className="text-[80px] font-semibold">{checkDigit(seconds)}</h2>
        </div>
      )}
    </div>
  );
}
