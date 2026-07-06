import { useState } from "react";
import api from "../services/api";

function Interview() {
  const [role, setRole] = useState("Software Engineer");
  const [type, setType] = useState("Technical");
  const [difficulty, setDifficulty] = useState("Medium");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQuestion = async () => {
    setLoading(true);

    try {
      const response = await api.post("/gemini/question", {
        role,
        interview_type: type,
        difficulty,
      });

      setQuestion(response.data.question);
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(
          `Error ${error.response.status}\n${JSON.stringify(
            error.response.data
          )}`
        );
      } else {
        alert("Failed to generate question. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-6">

      <h1 className="text-5xl font-bold text-gray-800 mb-10">
        🤖 AI Interview Coach
      </h1>

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-xl">

        {/* Role */}

        <label className="font-semibold text-gray-700">
          Job Role
        </label>

        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border rounded-lg p-3 mt-2 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Software Engineer"
        />

        {/* Interview Type */}

        <label className="font-semibold text-gray-700">
          Interview Type
        </label>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border rounded-lg p-3 mt-2 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Technical</option>
          <option>HR</option>
          <option>Coding</option>
        </select>

        {/* Difficulty */}

        <label className="font-semibold text-gray-700">
          Difficulty
        </label>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full border rounded-lg p-3 mt-2 mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        {/* Button */}

        <button
          onClick={generateQuestion}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition duration-300 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Generating AI Question..." : "Generate Question"}
        </button>

      </div>

      {/* Question Card */}

      {question && (
        <div className="mt-10 bg-white shadow-xl rounded-xl p-8 max-w-4xl w-full">

          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            🎯 Interview Question
          </h2>

          <p className="text-lg leading-8 text-gray-700">
            {question}
          </p>

        </div>
      )}

    </div>
  );
}

export default Interview;