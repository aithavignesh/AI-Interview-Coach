import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">

          <h1 className="text-3xl font-bold text-center text-blue-600">
            Welcome Back 👋
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Login to continue your AI Interview Journey
          </p>

          <form className="mt-8 space-y-5">

            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg px-4 py-3"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-lg px-4 py-3"
            />

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            >
              Login
            </button>

          </form>

          <p className="text-center mt-6">

            Don't have an account?

            <Link
              to="/register"
              className="text-blue-600 font-semibold ml-2"
            >
              Register
            </Link>

          </p>

        </div>
      </div>
    </>
  );
}

export default Login;