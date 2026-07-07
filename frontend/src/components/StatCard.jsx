function StatCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">

      <h3 className="text-gray-500 text-sm font-semibold">
        {title}
      </h3>

      <h2 className={`text-4xl font-bold mt-4 ${color}`}>
        {value}
      </h2>

    </div>
  );
}

export default StatCard;