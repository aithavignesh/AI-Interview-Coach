import { useState } from "react";
import Editor from "@monaco-editor/react";
import api from "../services/api";

function CodingInterview() {
  const [difficulty, setDifficulty] = useState("Medium");
  const [question, setQuestion] = useState(null);

  const [code, setCode] = useState(`print("Hello AI")`);

  const [evaluation, setEvaluation] = useState(null);
  const [output, setOutput] = useState("No Output Yet");
  const [customInput, setCustomInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const generateQuestion = async () => {
    setLoading(true);

    try {
      const response = await api.post("/coding/question", {
        difficulty,
      });

      setQuestion(response.data);
      setEvaluation(null);
      setOutput("No Output Yet");
    } catch (error) {
      console.error(error);
      alert("Failed to generate question.");
    }

    setLoading(false);
  };

  const runCode = async () => {
    try {
      const response = await api.post("/code/run", {
  code,
  input: customInput,
});

      console.log("Response:", response.data);

      if (response.data.stderr) {
        setOutput(response.data.stderr);
      } else {
        setOutput(response.data.stdout);
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
        setOutput(JSON.stringify(error.response.data, null, 2));
      } else {
        setOutput("Unable to run code.");
      }
    }
  };
const runTests = async () => {
  if (!question) {
    alert("Generate a question first.");
    return;
  }

  try {
    const response = await api.post("/code/test", {
      code,
      input: question.sample_input,
      expected_output: question.sample_output,
    });

    setTestResult(response.data);
  } catch (error) {
    console.error(error);
    alert("Unable to run test cases.");
  }
};
  const submitCode = async () => {
    if (!question) {
      alert("Generate a question first.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/coding/evaluate", {
        question: question.question,
        code,
      });

      setEvaluation(response.data);
    } catch (error) {
      console.error(error);
      alert("Evaluation failed.");
    }

    setLoading(false);
  };
  const downloadReport = async () => {
  if (!evaluation) {
    alert("Please evaluate your code first.");
    return;
  }

  try {
    const response = await api.post(
      "/report/download",
      {
        score: evaluation.score,
        strengths: [
          `Correctness: ${evaluation.correctness}`,
          `Time Complexity: ${evaluation.time_complexity}`,
          `Space Complexity: ${evaluation.space_complexity}`,
        ],
        weaknesses: [],
        feedback: evaluation.feedback,
      },
      {
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = "Coding_Interview_Report.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    alert("Unable to download report.");
  }
};
  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold text-center mb-10">
        💻 AI Coding Interview
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8">

        <div className="flex gap-5 mb-6">

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          <button
            onClick={generateQuestion}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            {loading ? "Generating..." : "Generate Question"}
          </button>

        </div>

        {question && (
          <>
            <h2 className="text-2xl font-bold">{question.title}</h2>

            <p className="mt-4 whitespace-pre-line">
              {question.question}
            </p>

            <div className="mt-4">
              <strong>Sample Input:</strong>
              <p>{question.sample_input}</p>
            </div>

            <div className="mt-2">
              <strong>Sample Output:</strong>
              <p>{question.sample_output}</p>
            </div>
          </>
        )}

        <div className="mt-8">

          <Editor
            height="500px"
            language="python"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
          />
          <div className="mt-6">

  <label className="block font-semibold mb-2">
    Program Input
  </label>

  <textarea
    rows={5}
    value={customInput}
    onChange={(e) => setCustomInput(e.target.value)}
    className="w-full border rounded-lg p-3"
    placeholder="Enter input here..."
  />

</div>
        </div>

        <div className="flex gap-4 mt-6">

  <button
    onClick={runCode}
    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg"
  >
    ▶ Run Code
  </button>

  <button
    onClick={runTests}
    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
  >
    ✅ Run Tests
  </button>

  <button
    onClick={submitCode}
    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
  >
    🤖 Submit Code
  </button>

</div>
        {/* Output */}

        <div className="mt-6 bg-black rounded-lg p-5">

          <h2 className="text-white text-xl font-bold mb-3">
            Output
          </h2>

          <pre className="text-green-400 whitespace-pre-wrap">
            {output}
          </pre>

        </div>
        {testResult && (
  <div className="mt-6 bg-blue-50 rounded-lg p-5 border">

    <h2 className="text-xl font-bold mb-3">
      Test Results
    </h2>

    <p className="text-lg">
      {testResult.passed ? "✅ Passed" : "❌ Failed"}
    </p>

    <div className="mt-3">
      <strong>Expected Output:</strong>
      <pre className="bg-white p-3 rounded mt-2">
        {testResult.expected}
      </pre>
    </div>

    <div className="mt-3">
      <strong>Your Output:</strong>
      <pre className="bg-white p-3 rounded mt-2">
        {testResult.actual}
      </pre>
    </div>

  </div>
)}
        {evaluation && (
          <div className="mt-10 bg-gray-100 rounded-xl p-6">

            <h2 className="text-3xl font-bold mb-5">
              AI Evaluation
            </h2>

            <p>⭐ Score: {evaluation.score}/10</p>

            <p>✅ Correctness: {evaluation.correctness}</p>

            <p>
              ⏱ Time Complexity: {evaluation.time_complexity}
            </p>

            <p>
              💾 Space Complexity: {evaluation.space_complexity}
            </p>

            <div className="mt-4">
              <strong>Feedback</strong>

              <p className="mt-2">
                {evaluation.feedback}
              </p>
            </div>
            <button
  onClick={downloadReport}
  className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
>
  📄 Download Report
</button>
          </div>
        )}

      </div>

    </div>
  );
}

export default CodingInterview;