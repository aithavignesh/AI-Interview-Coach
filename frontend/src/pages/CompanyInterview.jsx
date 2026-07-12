import { useState } from "react";
import api from "../services/api";

function CompanyInterview() {
  const [company, setCompany] = useState("Google");
  const [role, setRole] = useState("Software Engineer");
  const [experience, setExperience] = useState("Fresher");
  const [difficulty, setDifficulty] = useState("Medium");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState(null);

  const [loading, setLoading] = useState(false);

  const generateQuestion = async () => {
    try {
      setLoading(true);

      const response = await api.post("/company/question", {
        company,
        role,
        experience,
        difficulty,
      });

      setQuestion(response.data.question);
      setAnswer("");
      setEvaluation(null);
    } catch (error) {
      console.error(error);
      alert("Failed to generate question.");
    }

    setLoading(false);
  };

  const evaluateAnswer = async () => {
    if (!question) {
      alert("Generate a question first.");
      return;
    }

    if (!answer.trim()) {
      alert("Please enter your answer.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/company/evaluate", {
        company,
        role,
        experience,
        difficulty,
        question,
        answer,
      });

      setEvaluation(response.data);
    } catch (error) {
      console.error(error);
      alert("Evaluation failed.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold text-center mb-10">
        🏢 Company Interview
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8">

        <div className="grid md:grid-cols-2 gap-5">

          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="border p-3 rounded-lg"
          >
            <option>Google</option>
            <option>Microsoft</option>
            <option>Amazon</option>
            <option>Meta</option>
            <option>Apple</option>
            <option>Oracle</option>
            <option>Adobe</option>
            <option>JP Morgan</option>
            <option>TCS</option>
            <option>Infosys</option>
          </select>

          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role"
            className="border p-3 rounded-lg"
          />

          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="border p-3 rounded-lg"
          >
            <option>Fresher</option>
            <option>1-3 Years</option>
            <option>Senior</option>
          </select>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border p-3 rounded-lg"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

        </div>

        <button
          onClick={generateQuestion}
          disabled={loading}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
        >
          {loading ? "Generating..." : "Generate Question"}
        </button>

        {question && (
          <div className="mt-10 bg-gray-100 rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-4">
              Interview Question
            </h2>

            <p className="whitespace-pre-line">
              {question}
            </p>

            <textarea
              rows={8}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full border rounded-lg p-4 mt-6"
              placeholder="Type your answer here..."
            />

            <button
              onClick={evaluateAnswer}
              disabled={loading}
              className="mt-5 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
            >
              {loading ? "Evaluating..." : "Evaluate Answer"}
            </button>

          </div>
        )}

        {evaluation && (
          <div className="mt-10 bg-green-50 rounded-xl p-6">

            <h2 className="text-3xl font-bold mb-5">
              AI Evaluation
            </h2>

            <p className="text-xl">
              ⭐ Score: {evaluation.score}/10
            </p>

            <div className="mt-5">
              <h3 className="font-bold text-lg">
                ✅ Strengths
              </h3>

              <ul className="list-disc ml-6 mt-2">
                {evaluation.strengths.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <h3 className="font-bold text-lg">
                ⚠ Weaknesses
              </h3>

              <ul className="list-disc ml-6 mt-2">
                {evaluation.weaknesses.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <h3 className="font-bold text-lg">
                💬 Feedback
              </h3>

              <p className="mt-2">
                {evaluation.feedback}
              </p>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default CompanyInterview;