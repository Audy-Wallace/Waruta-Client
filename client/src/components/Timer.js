import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";

export default function Timer({ isCorrect, remainSeconds, setRemainSeconds }) {
  const [scoreTime, setScoreTime] = useState(0);

  let time;
  let timeStore;

  if (localStorage.getItem("time")) {
    let prevDate = localStorage.getItem("time");
    timeStore = new Date(prevDate);
  } else {
    time = new Date();
    time.setSeconds(time.getSeconds() + 300); // 5 minutes timer
    localStorage.setItem("time", time);
  }

  let { seconds, minutes, isRunning, start, pause, resume, restart } = useTimer(
    {
      expiryTimestamp: timeStore ? timeStore : time,
      onExpire: () => expiredTime(),
    }
  );

  useEffect(() => {
    setRemainSeconds(minutes * 60 + seconds);
    if (remainSeconds > 240 && remainSeconds <= 300) {
      setScoreTime(50);
    } else if (remainSeconds > 180) {
      setScoreTime(40);
    } else if (remainSeconds > 120) {
      setScoreTime(30);
    } else if (remainSeconds > 60) {
      setScoreTime(20);
    } else if (remainSeconds > 1) {
      setScoreTime(10);
    }
  }, [isRunning, seconds, minutes, remainSeconds]);
  useEffect(() => {
    if (isCorrect || localStorage.getItem("win")) {
      time = new Date();
      time.setSeconds(time.getSeconds() + +localStorage.getItem("remainingTime")); // 5 minutes timer
      localStorage.setItem("time", time);
      pause();
    }
  }, [isCorrect]);
  function expiredTime() {
    localStorage.removeItem("time");
    setScoreTime(0);
  }
  function checkDigit(menitDetik) {
    if (menitDetik < 10) {
      return `0${menitDetik}`;
    }
    return menitDetik;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "100px" }}>
        <span>{checkDigit(minutes)}</span>:<span>{checkDigit(seconds)}</span>
      </div>
    </div>
  );
}
