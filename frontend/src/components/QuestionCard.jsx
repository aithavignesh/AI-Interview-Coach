import ProgressBar from "./ProgressBar";
import Timer from "./Timer";

function QuestionCard({
  question,
  currentQuestion,
  totalQuestions,
}) {
  return (
    <div className="bg-white rounded-xl shadow-xl p-8">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl font-bold text-blue-600">
            🎯 Interview Question
          </h2>

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
            Question {currentQuestion} / {totalQuestions}
          </span>
        </div>

        <Timer />

      </div>

      <ProgressBar
        current={currentQuestion}
        total={totalQuestions}
      />

      <div className="mt-6 bg-gray-50 border rounded-lg p-6">
        <p className="text-lg leading-8">
          {question}
        </p>
      </div>

    </div>
  );
}

export default QuestionCard;