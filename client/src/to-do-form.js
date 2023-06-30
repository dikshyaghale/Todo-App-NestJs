import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
const TodoApp = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dateTime: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await fetch("http://localhost:3002/api/v1/to-do", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.statusCode === 201) {
        throw new Error("Failed");
      }

      const data = await response.json();
      if (data.statusCode === 201) {
        navigate("/table");
      }
    } catch (err) {
      console.log(err, "err");
    }
  };
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }
    if (!formData.dateTime.trim()) {
      errors.dateTime = "DateTime is required";
    }
    return errors;
  };
  return (
    <div className="form-container">
      <div className="button-container">
        <button className="custom-button" onClick={handleBackClick}>
          Go Back
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {<span className="error">{errors.name}</span>}
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {<span className="error">{errors.description}</span>}
        </div>
        <div>
          <label>DateTime</label>
          <input
            type="date"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleChange}
          />
          {<span className="error">{errors.dateTime}</span>}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default TodoApp;
