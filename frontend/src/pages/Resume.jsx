import { useState } from "react";
import api from "../services/api";

function Resume() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
const [difficulty, setDifficulty] = useState("Medium");
  const uploadResume = async () => {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await api.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAnalysis(response.data.analysis);
    } catch (error) {
      console.error(error);
      alert("Resume upload failed.");
    } finally {
      setLoading(false);
    }
  };
  const generateInterview = async () => {
  try {
    const response = await api.post("/resume/interview", {
      resume_text: JSON.stringify(analysis),
      difficulty,
    });

    setQuestions(response.data.questions);
  } catch (error) {
    console.error(error);
    alert("Failed to generate interview.");
  }
};
  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold text-center mb-10">
        📄 AI Resume Analyzer
      </h1>

      <div className="bg-white max-w-4xl mx-auto rounded-xl shadow-lg p-8">

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-6"
        />

        <button
          onClick={uploadResume}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
        <div className="mt-6">
  <label className="font-semibold">
    Interview Difficulty
  </label>

  <select
    value={difficulty}
    onChange={(e) => setDifficulty(e.target.value)}
    className="border w-full p-3 rounded mt-2"
  >
    <option>Easy</option>
    <option>Medium</option>
    <option>Hard</option>
  </select>
</div>
      </div>

      {analysis && (
        <div className="max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8">

          <h2 className="text-3xl font-bold text-green-600 mb-6">
            ⭐ Resume Score: {analysis.score}/100
          </h2>

          <div className="mb-6">
            <h3 className="text-2xl font-bold">
              🛠 Skills
            </h3>

            <ul className="list-disc ml-6 mt-3">
              {analysis.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-green-600">
              💪 Strengths
            </h3>

            <ul className="list-disc ml-6 mt-3">
              {analysis.strengths.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-red-600">
              ⚠ Weaknesses
            </h3>

            <ul className="list-disc ml-6 mt-3">
              {analysis.weaknesses.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-blue-600">
              💡 Suggestions
            </h3>

            <ul className="list-disc ml-6 mt-3">
              {analysis.suggestions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

        </div>
      )}
    {analysis && (
  <div className="max-w-4xl mx-auto mt-8">

    <button
      onClick={generateInterview}
      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
    >
      🎯 Generate Resume Interview
    </button>

    {questions.length > 0 && (
      <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

        <h2 className="text-3xl font-bold mb-6">
          Resume Based Interview Questions
        </h2>

        {questions.map((question, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg p-5 mb-4"
          >
            <strong>Q{index + 1}.</strong> {question}
          </div>
        ))}

      </div>
    )}

  </div>
)}
    </div>
  );
}

export default Resume;