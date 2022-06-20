import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { IonIcon } from "react-ion-icon";
export default function Voice({ answerVoice }) {
    const [mulai, setMulai] = useState(false)
    const [speech, setSpeech] = useState('');

    const commands = [
        {
            command: 'Mulai',
            callback: () => setMulai(true)
        },
        {
            command: 'clear',
            callback: ({ resetTranscript }) => resetTranscript()
        }
    ]
    const {
        transcript,
        listening,
        finalTranscript,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition(commands);

    React.useEffect(() => {
        answerVoice(finalTranscript)
    }, [finalTranscript])

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }
    
    return (
        <div>
            {/* <p>Microphone: {listening ? 'on' : 'off'}</p> */}
            <button onClick={() => SpeechRecognition.startListening({ language: 'id' })}>
                {!listening && <IonIcon name='mic-outline' style={{ color: 'black', fontSize: '45px' }} />}
                {listening && <IonIcon name='mic-outline' style={{ color: 'red', fontSize: '45px' }} />}
            </button>
            {/* <button onClick={() => SpeechRecognition.startListening({ language: 'id' })}>Start</button>
            <button onClick={() => SpeechRecognition.stopListening()}>Stop</button>
            <button onClick={resetTranscript}>Reset</button> */}
            {/* <p>Transcript: {transcript}</p> */}
        </div>
    );
}