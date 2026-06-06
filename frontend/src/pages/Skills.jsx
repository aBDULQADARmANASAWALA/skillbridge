import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import ErrorMessage from "../components/ErrorMessage";
import getErrorMessage from "../utils/getErrorMessage";

function Skills() {
  const [skills, setSkills] = useState([]); //skills of the current user
  const [availableSkills, setAvailableSkills] = useState([]); //all available skills
  const [skill, setSkill] = useState("");
  const [newSkillName, setNewSkillName] = useState("");
  const [level, setLevel] = useState("beginner");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSkills();
    fetchAvailableSkills();
    fetchCategories();
  }, []);

  const getSkillName = (skillId) => {
    const skill = availableSkills.find(
      (s) => s.id === skillId
    );

    return skill ? skill.name : String(skillId);
  };

  const createSkill = async (e) => {
    e.preventDefault();

    setError("");

    try {
      await api.post("skills/", {
        name: newSkillName,
        category: Number(categoryId),
      });

      setNewSkillName("");
      setCategoryId("");

      fetchAvailableSkills();
    } catch (error) {
      setError(getErrorMessage(error));
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get(
        "categories/"
      );

      setCategories(response.data);
    } catch (error) {
      setError(getErrorMessage(error));
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

  const fetchSkills = async () => {

    setError("");

    try {
      const response = await api.get("user-skills/");
      setSkills(response.data);
    } catch (error) {
      setError(
        getErrorMessage(error)
      );
    }
  };

  const addSkill = async (e) => {
    setError("");
    e.preventDefault();

    try {
      await api.post("user-skills/", {
        skill: Number(skill),
        proficiency_level: level,
      });

      setSkill("");
      fetchSkills();
    } catch (error) {
      setError(
        getErrorMessage(error)
      );
    }
  };

  return (
    <div className="container">
      <Navbar />
      <h1>My Skills</h1>

      <ErrorMessage error={error} />

      <form onSubmit={addSkill}>
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

        <select
          className="select"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="expert">Expert</option>
        </select>

        <button className="btn" type="submit">
          Add Skill
        </button>
      </form>

      <hr />

      <h2>Create New Skill</h2>

      <form onSubmit={createSkill}>

        <input
          className="input"
          type="text"
          placeholder="Skill Name"
          value={newSkillName}
          onChange={(e) =>
            setNewSkillName(e.target.value)
          }
        />

        <select
          className="select"
          value={categoryId}
          onChange={(e) =>
            setCategoryId(e.target.value)
          }
        >
          <option value="">
            Select Category
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>

        <button className="btn" type="submit">
          Create Skill
        </button>

      </form>

      <hr />

      <div className="cards-grid">
        {skills.map((item) => (
          <div className="card" key={item.id}>
            <p>
              <strong>{getSkillName(item.skill).toUpperCase()}</strong> — {item.proficiency_level.toUpperCase()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;