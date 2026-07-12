import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import StatCard from "../components/StatCard";
import DashboardCharts from "../components/DashboardCharts";
import PerformanceCard from "../components/PerformanceCard";
function Dashboard() {
  const [history, setHistory] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const response = await api.get("/interview/history");
      setHistory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const totalInterviews = history.length;

  const averageScore =
    history.length > 0
      ? (
          history.reduce(
            (sum, item) => sum + item.average_score,
            0
          ) / history.length
        ).toFixed(1)
      : 0;

  const highestScore =
    history.length > 0
      ? Math.max(...history.map((item) => item.average_score))
      : 0;

  const lowestScore =
    history.length > 0
      ? Math.min(...history.map((item) => item.average_score))
      : 0;
  const readiness = Math.min(
  100,
  Math.round((Number(averageScore) / 10) * 100)
);
  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-10">
        📊 AI Interview Dashboard
      </h1>

      {/* Statistics */}

      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <StatCard
          title="Total Interviews"
          value={totalInterviews}
          color="text-blue-600"
        />

        <StatCard
          title="Average Score"
          value={averageScore}
          color="text-green-600"
        />

        <StatCard
          title="Highest Score"
          value={highestScore}
          color="text-purple-600"
        />

        <StatCard
          title="Lowest Score"
          value={lowestScore}
          color="text-red-600"
        />

      </div>
      {/* Quick Actions */}

<div className="bg-white rounded-2xl shadow-lg p-8 mb-10">

  <h2 className="text-3xl font-bold mb-6">
    🚀 Quick Actions
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

    <Link
      to="/interview"
      className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-6 text-center font-bold transition"
    >
      🎤 Mock Interview
    </Link>

    <Link
      to="/resume"
      className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-6 text-center font-bold transition"
    >
      📄 Resume Analyzer
    </Link>

    <Link
      to="/coding"
      className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-6 text-center font-bold transition"
    >
      💻 Coding Interview
    </Link>

    <Link
      to="/company-interview"
      className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl p-6 text-center font-bold transition"
    >
      🏢 Company Interview
    </Link>
    <Link
  to="/coding-history"
  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl p-6 text-center font-bold transition"
>
  📜 Coding History
</Link>
  </div>

</div>
<DashboardCharts history={history} />

<div className="mt-10">
  <PerformanceCard average={averageScore} />
</div>

<div className="mt-10 bg-white rounded-2xl shadow-lg p-8">

  <h2 className="text-3xl font-bold mb-5">
    🎯 Interview Readiness
  </h2>

  <div className="flex items-center justify-between">

    <div>

      <h3 className="text-6xl font-bold text-green-600">
        {readiness}%
      </h3>

      <p className="text-gray-600 mt-2">
        Based on your interview performance.
      </p>

    </div>

    <div className="text-8xl">
      🎯
    </div>

  </div>

</div>
      {/* Interview History */}

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-3xl font-bold mb-8">
          Recent Interviews
        </h2>

        {history.length === 0 ? (
          <p>No interviews found.</p>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl p-5 mb-5 hover:bg-gray-50 transition"
            >
              <h3 className="text-xl font-bold">
                {item.role}
              </h3>

              <p className="mt-2">
                <strong>Interview Type:</strong> {item.interview_type}
              </p>

              <p>
                <strong>Difficulty:</strong> {item.difficulty}
              </p>

              <p className="text-green-600 font-bold mt-3">
                ⭐ Average Score: {item.average_score}
              </p>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Dashboard;