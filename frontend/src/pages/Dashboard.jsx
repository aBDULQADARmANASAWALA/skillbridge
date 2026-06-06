import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ErrorMessage from "../components/ErrorMessage";
import getErrorMessage from "../utils/getErrorMessage";

function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    setError("");

    try {
      const response = await api.get("dashboard/");
      setData(response.data);
    } catch (error) {
      setError(
        getErrorMessage(error) ||
        "Something went wrong"
      );
    }
  };

  if (!data) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">
      <Navbar />
      <h1>Dashboard</h1>

      <ErrorMessage error={error} />

      <div className="cards-grid">
        {Object.entries(data).map(([key, value]) => (
          <p key={key} className="card">
            <strong>{key}:</strong> {value}
          </p>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;