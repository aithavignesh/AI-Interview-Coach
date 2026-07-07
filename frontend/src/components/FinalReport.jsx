function FinalReport({ history }) {
  if (history.length === 0) return null;

  const scores = history.map((item) => item.score);

  const average =
    scores.reduce((a, b) => a + b, 0) / scores.length;

  const highest = Math.max(...scores);
  const lowest = Math.min(...scores);

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 mt-10">

      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
        📊 Final Interview Report
      </h2>

      <div className="grid grid-cols-3 gap-6 text-center">

        <div className="bg-blue-100 rounded-lg p-5">
          <h3 className="font-bold">
            Average
          </h3>

          <p className="text-3xl mt-2">
            {average.toFixed(1)}
          </p>
        </div>

        <div className="bg-green-100 rounded-lg p-5">
          <h3 className="font-bold">
            Highest
          </h3>

          <p className="text-3xl mt-2">
            {highest}
          </p>
        </div>

        <div className="bg-red-100 rounded-lg p-5">
          <h3 className="font-bold">
            Lowest
          </h3>

          <p className="text-3xl mt-2">
            {lowest}
          </p>
        </div>

      </div>

    </div>
  );
}

export default FinalReport;