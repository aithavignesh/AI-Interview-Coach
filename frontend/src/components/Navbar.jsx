import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-12 py-5 bg-white shadow-md">

      <Link to="/" className="text-3xl font-bold text-blue-600">
        🤖 AI Interview Coach
      </Link>

      <div className="flex gap-4 items-center">

        {!token ? (
          <>
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
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="hover:text-blue-600 font-medium"
            >
              Dashboard
            </Link>

            <Link
              to="/interview"
              className="hover:text-blue-600 font-medium"
            >
              Interview
            </Link>

            <Link
              to="/resume"
              className="hover:text-blue-600 font-medium"
            >
              Resume
            </Link>

            <button
              onClick={logout}
              className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;