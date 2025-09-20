import React, { useState } from "react";

const VoiceRecorder: React.FC = () => {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";  // You can set language (e.g., "hi-IN" for Hindi)
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      setListening(false);

      // Send recognized text to backend
      fetch("http://127.0.0.1:8000/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: transcript }),
      });
    };

    recognition.onerror = (err: any) => {
      console.error("Speech recognition error:", err);
      setListening(false);
    };

    recognition.start();
  };

  return (
    <div className="p-4 text-center">
      <button
        onClick={startListening}
        className="bg-blue-500 text-white px-4 py-2 rounded-xl"
      >
        {listening ? "Listening..." : "🎤 Speak"}
      </button>
      <p className="mt-4 text-lg">Recognized: {text}</p>
    </div>
  );
};

export default VoiceRecorder;
