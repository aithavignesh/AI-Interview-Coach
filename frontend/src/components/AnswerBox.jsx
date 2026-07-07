function AnswerBox({
  answer,
  setAnswer,
  submitAnswer,
  loading,
}) {
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

      <button
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