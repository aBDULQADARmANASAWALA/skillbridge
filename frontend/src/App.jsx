import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Skills from "./pages/Skills";
import Categories from "./pages/Categories";
import Offers from "./pages/Offers";
import Requests from "./pages/Requests";
import Reviews from "./pages/Reviews";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
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
          path="/skills"
          element={
            <ProtectedRoute>
              <Skills />
            </ProtectedRoute>
          }
        />

        <Route path="/categories" element={
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        } />

        <Route
          path="/offers"
          element={
            <ProtectedRoute>
              <Offers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/requests"
          element={
            <ProtectedRoute>
              <Requests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reviews"
          element={
            <ProtectedRoute>
              <Reviews />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;