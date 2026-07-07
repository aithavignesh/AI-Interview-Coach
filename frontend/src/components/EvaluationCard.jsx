function EvaluationCard({
  evaluation,
  currentQuestion,
  totalQuestions,
  nextQuestion,
}) {
  if (!evaluation) return null;

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 mt-8">

      <h2 className="text-3xl font-bold text-green-600 mb-6">
        🤖 AI Evaluation
      </h2>

      <div className="bg-green-100 rounded-lg p-5 mb-6">
        <h3 className="text-2xl font-bold">
          ⭐ Score: {evaluation.score}/10
        </h3>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold text-green-700 mb-2">
          ✅ Strengths
        </h3>

        <ul className="list-disc ml-6">
          {evaluation.strengths.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold text-red-600 mb-2">
          ⚠️ Weaknesses
        </h3>

        <ul className="list-disc ml-6">
          {evaluation.weaknesses.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-100 rounded-lg p-5">
        <h3 className="text-xl font-bold mb-3">
          💬 Overall Feedback
        </h3>

        <p>{evaluation.feedback}</p>
      </div>

      <button
        onClick={nextQuestion}
        className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
      >
        {currentQuestion === totalQuestions
          ? "Finish Interview"
          : "Next Question →"}
      </button>

    </div>
  );
}

export default EvaluationCard;