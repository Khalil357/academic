// src/DynamicForm.js
import React, { useState } from "react";
import "./DynamicForm.css"; // Optional: Styling specific to DynamicForm

const TextInput = ({ label, name, value, onChange }) => (
  <div className="input-group">
    <label>{label}:</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="text-input"
    />
  </div>
);

const DynamicForm = () => {
  const [formElements, setFormElements] = useState([]);
  const [formData, setFormData] = useState({});
  const [inputLabel, setInputLabel] = useState("");

  const addTextInput = () => {
    const newElement = {
      type: "text",
      label: inputLabel,
      name: `input-${formElements.length + 1}`,
      value: ""
    };
    setFormElements([...formElements, newElement]);
    setInputLabel("");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="dynamic-form">
      <h2>Add New Input Fields</h2>
      <div className="input-controls">
        <input
          type="text"
          value={inputLabel}
          onChange={(e) => setInputLabel(e.target.value)}
          placeholder="Enter label for new input"
        />
        <button type="button" onClick={addTextInput}>
          Add Text Input
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        {formElements.map((element, index) => (
          <TextInput
            key={index}
            label={element.label}
            name={element.name}
            value={formData[element.name] || ""}
            onChange={handleInputChange}
          />
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DynamicForm;
