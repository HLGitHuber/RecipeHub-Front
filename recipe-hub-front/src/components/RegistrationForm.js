import React, { useState } from 'react';
import "../css/registrationForm.css"
import axios from 'axios';
import apiSettings from '../config/apisettings';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    UserName: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
  });

  const [errors, setErrors] = useState({
    UserName: '',
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
    if (!formData.UserName) {
      newErrors.name = 'Name is required.';
    }
    if (!formData.Email) {
      newErrors.email = 'Email is required.';
    }
    if (!formData.Password) {
      newErrors.password = 'Password is required.';
    }
    if (!passwordCheck(formData.Password)) {
      newErrors.password = 'Password has to have 8 characters including small and big letters, number and special character.';
    }
    if (!formData.ConfirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required.';
    }
    if (formData.Password !== formData.ConfirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (Object.keys(newErrors).length === 0) {
      axios({
        method: 'options',
        url: apiSettings.apiUrlUserRegister,
        data: formData,
        headers: {
          'Content-Type': 'application/json-patch+json',
        }
      })
        .then(response => {
          navigate('/')
        })
        .catch(error => {
          console.log('formData', formData);
          console.log('Error', error);
        })
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="registration-container">
      <h2 className="registration-title">Registration Form</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div>
        <span className="error">{errors.UserName}</span>
          <input
            className='input'
            type="text"
            name="UserName"
            placeholder="Username"
            sx={{ backgroundColor: 'bisque', ml: 1, flex: 1 }}
            value={formData.UserName}
            onChange={handleChange}
          />
        </div>
        <div>
        <span className="error">{errors.Email}</span>
          <input
            className='input'
            type="email"
            name="Email"
            placeholder="Email"
            value={formData.Email}
            onChange={handleChange}
          />
        </div>
        <div>
        <span className="error">{errors.Password}</span>
          <input
            className='input'
            type="password"
            name="Password"
            placeholder="Password"
            value={formData.Password}
            onChange={handleChange}
          />
        </div>
        <div>
        <span className="error">{errors.ConfirmPassword}</span>
          <input
            className='input'
            type="password"
            name="ConfirmPassword"
            placeholder="Confirm password"
            value={formData.ConfirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
