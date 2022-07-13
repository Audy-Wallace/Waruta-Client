import React, { useEffect, useState } from "react"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import { IonIcon } from "react-ion-icon"
export default function Voice({ answerVoice }) {
  const [mulai, setMulai] = useState(false)
  const [speech, setSpeech] = useState("")

  const commands = [
    {
      command: "Mulai",
      callback: () => setMulai(true),
    },
    {
      command: "clear",
      callback: ({ resetTranscript }) => resetTranscript(),
    },
  ]
  const {
    transcript,
    listening,
    finalTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition(commands)

  React.useEffect(() => {
    answerVoice(finalTranscript)
  }, [finalTranscript])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>
  }

  return (
    <div>
      {/* <p>Microphone: {listening ? 'on' : 'off'}</p> */}
      {!listening && (
        <button
          className="px-[20px] py-3 text-[30px] font-semibold bg-yellow-400 text-black rounded-full shadow-md"
          onClick={() => SpeechRecognition.startListening({ language: "id" })}
        >
          <IonIcon name="mic-outline" />
        </button>
      )}
      {listening && (
        <div>
          <button
            className="-mr-[70px] px-[20px] py-3 text-[30px] font-semibold rounded-full text-sky-500 bg-blue-300 opacity-60 animate-ping duration-300 shadow-md"
            onClick={() => SpeechRecognition.startListening({ language: "id" })}
          >
            <IonIcon name="mic-outline" />
          </button>
          <button
            className="px-[20px] relative py-3 text-[30px] font-semibold rounded-full text-rose-600 bg-white duration-300 shadow-md"
            onClick={() => SpeechRecognition.startListening({ language: "id" })}
          >
            <IonIcon name="mic-outline" />
          </button>
        </div>
      )}
    </div>
  )
}
