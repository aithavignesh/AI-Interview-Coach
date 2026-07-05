function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
      <div className="text-5xl mb-4">{icon}</div>

      <h2 className="text-2xl font-bold mb-2">
        {title}
      </h2>

      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;