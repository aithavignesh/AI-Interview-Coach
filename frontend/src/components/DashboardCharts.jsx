import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function DashboardCharts({ history }) {
  const lineData = {
    labels: history.map((_, index) => `Interview ${index + 1}`),
    datasets: [
      {
        label: "Interview Score",
        data: history.map((item) => item.average_score),
        borderColor: "#2563eb",
        backgroundColor: "#93c5fd",
      },
    ],
  };

  const doughnutData = {
    labels: ["Completed", "Remaining Goal"],
    datasets: [
      {
        data: [history.length, Math.max(20 - history.length, 0)],
        backgroundColor: ["#10b981", "#e5e7eb"],
      },
    ],
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 mt-10">

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-5">
          Interview Progress
        </h2>

        <Line data={lineData} />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-5">
          Goal Progress
        </h2>

        <Doughnut data={doughnutData} />
      </div>

    </div>
  );
}

export default DashboardCharts;