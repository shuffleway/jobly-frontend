import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import './LoginForm.css';


const LoginForm = ({ login }) => {
  const initialState = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState([]);
  const navigate = useNavigate();

  // Use useContext to get currentUser from UserContext
  const { currentUser } = useContext(UserContext);

  // Navigate to /companies if user is already logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/companies");
    }
  }, [currentUser, navigate]);

  // Handle change function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  // Validate form before submission
  const validateForm = () => {
    const errors = [];
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        errors.push(`${key.replace("_", " ")} is required.`);
      }
    });
    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const result = await login(formData);
      if (result.success) {
        navigate("/companies");
      } else {
        setFormErrors(result.error || []);
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="LoginForm">
      {formErrors.length > 0 && (
        <div>
          <ul>
            {formErrors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          placeholder="Username"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default LoginForm;
