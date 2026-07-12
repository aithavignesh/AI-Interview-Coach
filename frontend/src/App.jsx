import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";
import Resume from "./pages/Resume";
import CodingInterview from "./pages/CodingInterview";
import ProtectedRoute from "./components/ProtectedRoute";
import CompanyInterview from "./pages/CompanyInterview";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interview"
          element={
            <ProtectedRoute>
              <Interview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <Resume />
            </ProtectedRoute>
          }
        />
        <Route
  path="/coding"
  element={
    <ProtectedRoute>
      <CodingInterview />
    </ProtectedRoute>
  }
/>
<Route
  path="/company-interview"
  element={
    <ProtectedRoute>
      <CompanyInterview />
    </ProtectedRoute>
  }
/>
<Route
  path="/coding-history"
  element={
    <ProtectedRoute>
      <CodingHistory />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;