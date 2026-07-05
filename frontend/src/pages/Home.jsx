import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gray-50">
        <h1 className="text-6xl font-bold text-gray-900">
          Ace Your Next Interview 🚀
        </h1>

        <p className="mt-6 text-xl text-gray-600 max-w-3xl">
          Practice AI-powered HR, Technical and Coding Interviews.
          Get instant feedback, personalized suggestions and improve
          your confidence.
        </p>

        <Link
          to="/interview"
          className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-xl transition duration-300"
        >
          Start Interview
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 px-10 bg-white">
        <h2 className="text-5xl font-bold text-center mb-16">
          Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon="🎤"
            title="HR Interview"
            description="Practice HR questions with AI."
          />

          <FeatureCard
            icon="💻"
            title="Technical"
            description="Practice DSA, DBMS, OS and CN."
          />

          <FeatureCard
            icon="🤖"
            title="AI Feedback"
            description="Receive detailed AI evaluation."
          />

          <FeatureCard
            icon="📄"
            title="Resume Analysis"
            description="Upload your resume for personalized questions."
          />
        </div>
      </section>
    </>
  );
}

export default Home;