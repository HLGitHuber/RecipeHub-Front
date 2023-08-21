import React, { useState } from 'react';
import "../css/registrationForm.css"

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const passwordCheck = (givenPassword) => {
      const hasUpperCase = /[A-Z]/.test(givenPassword);
      const hasLowerCase = /[a-z]/.test(givenPassword);
      const hasNumber = /[0-9]/.test(givenPassword);
      const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(givenPassword);
      const isLengthValid = givenPassword.length >= 8;
  
      const isPasswordValid =
        hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLengthValid;
  
      return isPasswordValid;
  }
 
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required.';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }
    if (!passwordCheck(formData.password)) {
      newErrors.password = 'Password has to have 8 characters including small and big letters, number and special character';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (Object.keys(newErrors).length === 0) {
      // Submit the form or perform any further actions here
      console.log('Form submitted:', formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="registration-container">
      <h2 className="registration-title">Registration Form</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <span className="error">{errors.name}</span>
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <span className="error">{errors.email}</span>
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <span className="error">{errors.password}</span>
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <span className="error">{errors.confirmPassword}</span>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
