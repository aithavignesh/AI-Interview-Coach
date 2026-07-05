import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-12 py-5 bg-white shadow-md">

      <Link to="/" className="text-3xl font-bold text-blue-600">
        🤖 AI Interview Coach
      </Link>

      <div className="flex gap-4">

        <Link
          to="/login"
          className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
        >
          Register
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;