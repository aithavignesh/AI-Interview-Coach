function InterviewSetup({
  role,
  setRole,
  type,
  setType,
  difficulty,
  setDifficulty,
  loading,
  generateQuestion,
}) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">

      <label className="font-semibold">Job Role</label>

      <input
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border w-full p-3 rounded mt-2 mb-5"
      />

      <label className="font-semibold">Interview Type</label>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border w-full p-3 rounded mt-2 mb-5"
      >
        <option>Technical</option>
        <option>HR</option>
        <option>Coding</option>
      </select>

      <label className="font-semibold">Difficulty</label>

      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="border w-full p-3 rounded mt-2 mb-8"
      >
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <button
        onClick={generateQuestion}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-500"
      >
        {loading ? "Generating AI Question..." : "Generate Question"}
      </button>

    </div>
  );
}

export default InterviewSetup;