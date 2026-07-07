function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span className="font-semibold">
          Progress
        </span>

        <span>
          {current} / {total}
        </span>
      </div>

      <div className="w-full bg-gray-300 rounded-full h-3">
        <div
          className="bg-blue-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;