import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import ErrorMessage from "../components/ErrorMessage";
import getErrorMessage from "../utils/getErrorMessage";

function Offers() {
  const [offers, setOffers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skill, setSkill] = useState("");
  const [availableSkills, setAvailableSkills] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOffers();
    fetchAvailableSkills();
    fetchAvailableUsers();
  }, []);

  const getUserName = (id) => {
    const user = availableUsers.find(
      (u) => u.id === id
    );

    return user ? user.username : id;
  };

  const fetchAvailableUsers = async () => {
    try {
      const response = await api.get(
        "auth/users/"
      );

      setAvailableUsers(response.data);
    } catch (error) {
      setError(getErrorMessage(error));
    }
  };

  const getSkillName = (id) => {
    const skill = availableSkills.find(
      (s) => s.id === id
    );

    return skill ? skill.name : String(id);
  };

  const fetchAvailableSkills = async () => {
    try {
      const response = await api.get(
        "skills/"
      );

      setAvailableSkills(response.data);
    } catch (error) {
      setError(getErrorMessage(error));
    }
  };

  const fetchOffers = async () => {
    setError("");

    try {
      const response = await api.get("offers/");
      setOffers(response.data);
    } catch (error) {
      setError(
        getErrorMessage(error)
      );
    }
  };

  const addOffer = async (e) => {
    setError("");
    e.preventDefault();

    try {
      await api.post("offers/", {
        title,
        description,
        skill: Number(skill),
      });

      setTitle("");
      setDescription("");
      setSkill("");

      fetchOffers();
    } catch (error) {
      setError(
        getErrorMessage(error)
      );
    }
  };

  return (
    <div className="container">
      <Navbar />
      <h1>Offers</h1>

      <ErrorMessage error={error} />

      <form onSubmit={addOffer}>
        <input
          className="input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />

        <textarea
          className="textarea"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <br />
        <select
          className="select"
          value={skill}
          onChange={(e) =>
            setSkill(e.target.value)
          }
        >
          <option value="">
            Select Skill
          </option>

          {availableSkills.map((item) => (
            <option
              key={item.id}
              value={item.id}
            >
              {item.name}
            </option>
          ))}
        </select>

        <br />

        <button type="submit" className="btn">
          Create Offer
        </button>
      </form>

      <hr />

      <div className="cards-grid">
        {offers.map((offer) => (
          <div key={offer.id} className="card">
            <h3>{offer.title}</h3>

            <p>{offer.description}</p>

            <p>
              <strong>Skill:</strong> {getSkillName(offer.skill).toUpperCase()}
            </p>

            <p>
              <strong>User:</strong> {getUserName(offer.user)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Offers;