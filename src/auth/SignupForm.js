import React, { useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import './SignupForm.css';

const SignupForm = ({ signup }) => {
  const initialState = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  // UseEffect to handle navigation if the user is already logged in
   useEffect(() => {
    if (currentUser) {
        navigate("/companies");
    }
   }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation: check for empty fields
    const errors = [];
    for (let field in formData) {
      if (!formData[field]) errors.push(`${field.replace('_', ' ')} is required.`);
    }

    if (errors.length > 0) {
      setFormErrors(errors);
    } else {
      const result = await signup(formData);
      if (result.success) {
        navigate("/companies");
      } else {
        setFormErrors(result.error || []);
      }
    }
  };

  return (
    <div>
       <h1>SignUp</h1>
      <form onSubmit={handleSubmit}  className="SignupForm">
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

      <div>
        <label htmlFor="firstName">First Name: </label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={formData.firstName}
          placeholder="First Name"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="lastName">Last Name: </label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={formData.lastName}
          placeholder="Last Name"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
        />
      </div>

      <button type="submit">Register</button>
    </form>
    </div>
  );
};

export default SignupForm;
