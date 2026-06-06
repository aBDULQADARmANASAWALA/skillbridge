import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import ErrorMessage from "../components/ErrorMessage";
import getErrorMessage from "../utils/getErrorMessage";

function Requests() {
  const [requests, setRequests] = useState([]);
  const [description, setDescription] = useState("");
  const [skill, setSkill] = useState("");
  const [availableSkills, setAvailableSkills] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRequests();
    fetchAvailableSkills();
  }, []);

  const fetchRequests = async () => {
    setError("");
    try {
      const response = await api.get("requests/");
      setRequests(response.data);
    } catch (error) {
      setError(
        getErrorMessage(error)
      );
    }
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

  const getSkillName = (id) => {
    const skill = availableSkills.find(
      (s) => s.id === id
    );

    return skill ? skill.name : String(id);
  }

  const addRequest = async (e) => {
    setError("");
    e.preventDefault();

    try {
      await api.post("requests/", {
        description,
        skill: Number(skill)
      });

      setDescription("");
      setSkill("");

      fetchRequests();
    } catch (error) {
      setError(
        getErrorMessage(error)
      );
    }
  };

  return (
    <div className="container">
      <Navbar />
      <h1>Requests</h1>

      <ErrorMessage error={error} />

      <form onSubmit={addRequest}>
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

        <button className="btn" type="submit">
          Create Request
        </button>
      </form>

      <hr />

      <div className="cards-grid">
        {requests.map((request) => (
          <div className="card" key={request.id}>
            <p>{request.description}</p>

            <p>
              <strong>Skill:</strong> {getSkillName(request.skill)}
            </p>

            <p>
              <strong>Status:</strong> {request.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Requests;