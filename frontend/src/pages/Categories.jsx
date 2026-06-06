import { useEffect, useState } from "react";
import api from "../api/axios";
import ErrorMessage from "../components/ErrorMessage";
import getErrorMessage from "../utils/getErrorMessage";
import Navbar from "../components/Navbar";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("categories/");
      setCategories(response.data);
    } catch (error) {
      setError(getErrorMessage(error));
    }
  };

  const createCategory = async (e) => {
    e.preventDefault();

    setError("");

    try {
      await api.post("categories/", {
        name,
      });

      setName("");
      fetchCategories();

    } catch (error) {
      setError(getErrorMessage(error));
    }
  };

  return (
    <div className="container">
      <Navbar className="navbar"/>

      <h1>Categories</h1>

      <ErrorMessage error={error} />

      <form onSubmit={createCategory}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          className="input"
        />

        <button type="submit" className="btn">
          Create
        </button>
      </form>

      <hr />

      <div className="cards-grid">
        {categories.map((category) => (
          <p key={category.id} className="card">
            {category.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Categories;