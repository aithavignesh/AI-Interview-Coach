import { useEffect, useState } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="bg-yellow-100 px-4 py-2 rounded-lg font-bold text-yellow-800">
      ⏱ {minutes}:{remainingSeconds.toString().padStart(2, "0")}
    </div>
  );
}

export default Timer;