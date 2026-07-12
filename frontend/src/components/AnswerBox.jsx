import { useRef, useState } from "react";

function AnswerBox({
  answer,
  setAnswer,
  submitAnswer,
  loading,
}) {
  const recognitionRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      console.log("Recording Started");
      setIsRecording(true);
    };
    recognition.onspeechstart = () => {
  console.log("Speech Started");
};

recognition.onspeechend = () => {
  console.log("Speech Ended");
};

recognition.onaudiostart = () => {
  console.log("Audio Started");
};

recognition.onaudioend = () => {
  console.log("Audio Ended");
};

   recognition.onresult = (event) => {
  console.log("RESULT EVENT");
  console.log(event);

  let transcript = "";

  for (let i = 0; i < event.results.length; i++) {
    transcript += event.results[i][0].transcript;
  }

  console.log("Transcript:", transcript);

  setAnswer(transcript);
};
    recognition.onend = () => {
      console.log("Recording Ended");
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    recognition.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 mt-8">

      <label className="font-semibold text-lg">
        ✍️ Your Answer
      </label>

      <textarea
        rows="8"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="border w-full p-4 rounded mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type your answer here..."
      />

      <div className="flex gap-4 mt-4">

        <button
          type="button"
          onClick={startRecording}
          disabled={isRecording}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          🎤 Start Recording
        </button>

        <button
          type="button"
          onClick={stopRecording}
          disabled={!isRecording}
          className="bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700"
        >
          ⏹ Stop Recording
        </button>

      </div>

      <button
        type="button"
        onClick={submitAnswer}
        disabled={loading}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-500 text-white py-3 rounded-lg font-semibold"
      >
        {loading ? "Evaluating..." : "Submit Answer"}
      </button>

    </div>
  );
}

export default AnswerBox;