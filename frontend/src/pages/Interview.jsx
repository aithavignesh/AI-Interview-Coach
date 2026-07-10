import { useState } from "react";
import api from "../services/api";
import InterviewSetup from "../components/InterviewSetup";
import QuestionCard from "../components/QuestionCard";
import AnswerBox from "../components/AnswerBox";
import EvaluationCard from "../components/EvaluationCard";
import FinalReport from "../components/FinalReport";
function Interview() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [role, setRole] =useState("Software Engineer");
  const [type, setType] = useState("Technical");
  const [difficulty, setDifficulty] = useState("Medium");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState(null);

  const [loading, setLoading] = useState(false);

  // Interview Progress
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [history, setHistory] = useState([]);
  const [interviewId, setInterviewId] = useState(null);
  const totalQuestions = 10;

  // Generate AI Question
  const generateQuestion = async () => {
    setLoading(true);

    try {
      // Create Interview only once
if (!interviewId) {

    const avg = 0;

    const saveInterview = await api.post("/interview/save", {

        user_id: user.id,

        role,

        interview_type: type,

        difficulty,

        average_score: avg,

    });

    setInterviewId(saveInterview.data.id);
}

const response = await api.post("/gemini/question", {

    role,

    interview_type: type,

    difficulty,

});

      setQuestion(response.data.question);
      setAnswer("");
      setEvaluation(null);
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(
          `Status: ${error.response.status}\n${JSON.stringify(
            error.response.data
          )}`
        );
      } else {
        alert("Failed to generate question.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Submit Answer
  const submitAnswer = async () => {
    if (answer.trim() === "") {
      alert("Please enter your answer.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/gemini/evaluate", {
  question,
  answer,
});

// Show evaluation on screen
setEvaluation(response.data);
await api.post("/interview/question/save", {
  interview_id: interviewId, // Temporary (we'll replace this later)
  question,
  answer,
  score: response.data.score,
  feedback: response.data.feedback,
});
// Save interview history
const interviewResult = {
  question,
  answer,
  score: response.data.score,
  feedback: response.data.feedback,
  strengths: response.data.strengths,
  weaknesses: response.data.weaknesses,
};

setHistory((prev) => [...prev, interviewResult]);

console.log("History Updated:", interviewResult);
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(
          `Status: ${error.response.status}\n${JSON.stringify(
            error.response.data
          )}`
        );
      } else {
        alert("Failed to evaluate answer.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Next Question
  const nextQuestion = async () => {
  if (currentQuestion < totalQuestions) {
    setCurrentQuestion((prev) => prev + 1);
    generateQuestion();
  } else {
    const average =
  history.reduce((sum, item) => sum + item.score, 0) /
  history.length;

await api.put(
  `/interview/update/${interviewId}`,
  null,
  {
    params: {
      average_score: average,
    },
  }
);

alert("🎉 Interview Completed!");
setInterviewId(null);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <h1 className="text-5xl font-bold text-center mb-10">
        🤖 AI Interview Coach
      </h1>

      {/* Settings */}

<InterviewSetup
  role={role}
  setRole={setRole}
  type={type}
  setType={setType}
  difficulty={difficulty}
  setDifficulty={setDifficulty}
  loading={loading}
  generateQuestion={generateQuestion}
/>

      {/* Question */}

{question && (
  <div className="max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow-xl p-8">

    <QuestionCard
  question={question}
  currentQuestion={currentQuestion}
  totalQuestions={totalQuestions}
/>

    <AnswerBox
  answer={answer}
  setAnswer={setAnswer}
  submitAnswer={submitAnswer}
  loading={loading}
/>

    {/* AI Evaluation */}

    <EvaluationCard
  evaluation={evaluation}
  currentQuestion={currentQuestion}
  totalQuestions={totalQuestions}
  nextQuestion={nextQuestion}
/>
  </div>
)}
<FinalReport history={history} />
    </div>
  );
}

export default Interview;
