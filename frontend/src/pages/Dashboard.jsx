import { useEffect, useState } from "react";
import api from "../services/api";
import StatCard from "../components/StatCard";

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