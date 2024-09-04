import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useFormData = ({ login, signup }) => {
  const initialState = {
    username: "",
    password: ""
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isTouched, setIsTouched] = useState({});
  const [formErrors, setFormErrors] = useState([]);

  // Handle change function
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value === "",
    }));

    setIsTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData);
    if (result.success) {
      navigate("/companies");
    } else {
      setFormErrors(result.errors);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const result = await signup(formData);
    if (result.success) {
      navigate("/companies");
    } else {
      setFormErrors(result.errors);
    }
  };

  return {
    formData,
    errors,
    isTouched,
    setFormData,
    handleChange,
    handleLoginSubmit,
    handleSignupSubmit,
    formErrors
  };
};

export default useFormData;
