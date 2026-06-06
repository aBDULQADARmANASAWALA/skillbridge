import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/dashboard">Dashboard</Link>

      <Link to="/categories">Categories</Link>

      <Link to="/skills">Skills</Link>

      <Link to="/offers">Offers</Link>

      <Link to="/requests">Requests</Link>

      <Link to="/reviews">Reviews</Link>

      <button
        className="btn"
        style={{ float: "right" }}
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;