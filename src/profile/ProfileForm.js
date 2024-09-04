import React, { useContext, useState, useEffect } from "react";
import UserContext from "../auth/UserContext";
import JoblyApi from "../api/api";
import './ProfileForm.css';
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    email: currentUser?.email || "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [saveConfirmed, setSaveConfirmed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    } 
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
    setFormErrors((errors) => ({ ...errors, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "First name is required.";
    if (!formData.lastName) errors.lastName = "Last name is required.";
    if (!formData.email) errors.email = "Email is required.";
    if (formData.password.length < 6) errors.password = "Password must be at least 6 characters long."; 
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;  
  
    const profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };
  
    let username = formData.username;
    let password = formData.password;

    let loggedInUser;
    let updatedUser;
    try {

      loggedInUser = await JoblyApi.login({username, password})
      if(loggedInUser){
        updatedUser = await JoblyApi.saveProfile(username, profileData);
        setCurrentUser(updatedUser);
        setFormData(data => ({ ...data, password: "" }));
        setFormErrors({});
        setSaveConfirmed(true);
      }
    } catch (error) {
      setFormErrors({ general: "Invalid Password, Please try again." });
    }
  };
  
  return (
    <div>
       <h1>Profile</h1>
       <form onSubmit={handleSubmit} className="ProfileForm">
      <div>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          placeholder="Username"
          onChange={handleChange}
          disabled
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
        {formErrors.firstName && <p className="error">{formErrors.firstName}</p>}
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
        {formErrors.lastName && <p className="error">{formErrors.lastName}</p>}
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
        {formErrors.email && <p className="error">{formErrors.email}</p>}
      </div>

      <div>
        <label htmlFor="password">Confirm Password: </label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
        />
        {formErrors.password && <p className="error">{formErrors.password}</p>}
      </div>

      {formErrors.general && <p className="error">{formErrors.general}</p>}
      {saveConfirmed && <p className="success">Profile updated successfully!</p>}

      <button type="submit">Save Profile</button>
    </form>
    </div>
  );
};

export default ProfileForm;
