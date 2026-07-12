function PerformanceCard({ average }) {
  let status = "";
  let color = "";

  if (average >= 9) {
    status = "Interview Ready";
    color = "text-green-600";
  } else if (average >= 7) {
    status = "Almost Ready";
    color = "text-yellow-600";
  } else {
    status = "Needs Improvement";
    color = "text-red-600";
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-5">
        AI Recommendation
      </h2>

      <p className={`text-3xl font-bold ${color}`}>
        {status}
      </p>

      <p className="mt-3">
        Current Average Score: {average}
      </p>

    </div>
  );
}

export default PerformanceCard;