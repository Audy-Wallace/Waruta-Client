import React, { useEffect, useState } from "react"
import { useTimer } from "react-timer-hook"
export default function Timer({ isCorrect, remainSeconds, setRemainSeconds }) {
  const [scoreTime, setScoreTime] = useState(0)

  let time
  let timeStore

  if (localStorage.getItem("time")) {
    let prevDate = localStorage.getItem("time")
    timeStore = new Date(prevDate)
  } else {
    time = new Date()
    time.setSeconds(time.getSeconds() + 300) // 5 minutes timer
    localStorage.setItem("time", time)
  }

  let { seconds, minutes, isRunning, start, pause, resume, restart } = useTimer({
    expiryTimestamp: timeStore ? timeStore : time,
    onExpire: () => expiredTime(),
  })

  useEffect(() => {
    setRemainSeconds(minutes * 60 + seconds)
    if (remainSeconds > 240 && remainSeconds <= 300) {
      setScoreTime(50)
    } else if (remainSeconds > 180) {
      setScoreTime(40)
    } else if (remainSeconds > 120) {
      setScoreTime(30)
    } else if (remainSeconds > 60) {
      setScoreTime(20)
    } else if (remainSeconds > 1) {
      setScoreTime(10)
    }
  }, [isRunning, seconds, minutes, remainSeconds])
  useEffect(() => {
    if (isCorrect || localStorage.getItem("win")) {
      time = new Date()
      time.setSeconds(time.getSeconds() + +localStorage.getItem("remainingTime")) // 5 minutes timer
      localStorage.setItem("time", time)
      pause()
    }
  }, [isCorrect])
  function expiredTime() {
    localStorage.removeItem("time")
    setScoreTime(0)
  }
  function checkDigit(menitDetik) {
    if (menitDetik < 10) {
      return `0${menitDetik}`
    }
    return menitDetik
  }

  return (
    <div className="flex w-full justify-center space-x-4">
      {checkDigit(minutes) > 1 && (
        <div className="text-violet-200 shadow-xl text-center flex flex-col justify-center bg-violet-800 bg-opacity-60 w-20 h-20 rounded-full duration-300">
          <h2 className="text-2xl font-semibold">{checkDigit(minutes)}</h2>
          <h2 className="text-xs">minutes</h2>
        </div>
      )}
      {checkDigit(minutes) == 1 && (
        <div className="text-violet-200 shadow-xl text-center flex flex-col justify-center bg-violet-800 bg-opacity-60 w-20 h-20 rounded-full duration-300">
          <h2 className="text-2xl font-semibold">{checkDigit(minutes)}</h2>
          <h2 className="text-xs">minute</h2>
        </div>
      )}
      {checkDigit(minutes) > 0 && (
        <div className="text-violet-200 shadow-xl text-center flex flex-col justify-center bg-violet-800 bg-opacity-60 w-20 h-20 rounded-full duration-300">
          <h2 className="text-2xl font-semibold">{checkDigit(seconds)}</h2>
          <h2 className="text-xs">seconds</h2>
        </div>
      )}
      {checkDigit(minutes) == 0 && (
        <div className="text-violet-200 shadow-xl text-center flex flex-col justify-center bg-violet-800 bg-opacity-60 w-40 h-40 rounded-full duration-300">
          <h2 className="text-[80px] font-semibold">{checkDigit(seconds)}</h2>
        </div>
      )}
    </div>
  )
}
