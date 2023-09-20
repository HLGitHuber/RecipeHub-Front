import React, { useState } from 'react';
import "../css/registrationForm.css"
import axios from 'axios';
import apiSettings from '../config/apisettings';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    UserName: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
  });

  const [errors, setErrors] = useState({
    UserName: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    if (name === 'Email') {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(value)) {
        newErrors[name] = 'Invalid email address.';
      } else {
        newErrors[name] = ''; // Clear the error if it's a valid email
      }
    } else {
      newErrors[name] = ''; // Clear errors for other fields
    }

    setErrors(newErrors);
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

    // Check if there are any errors in the current form data
    const hasErrors = Object.values(errors).some((error) => !!error);

    if (!hasErrors) {
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
      // You can choose to display a general form error here or handle it differently
      console.log('Form has validation errors.');
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    if (name === 'UserName' && !value) {
      newErrors.UserName = 'Name is required.';
    }

    if (name === 'Email' && !value) {
      newErrors.Email = 'Email is required.';
    }

    if (name === 'Password') {
      if (!value) {
        newErrors.Password = 'Password is required.';
      } else if (!passwordCheck(value)) {
        newErrors.Password =
          'Password has to have 8 characters including small and big letters, number, and special character.';
      } else {
        newErrors.Password = ''; // Clear the error if it's a valid password
      }
    }

    if (name === 'ConfirmPassword') {
      if (!value) {
        newErrors.ConfirmPassword = 'Confirm Password is required.';
      } else if (formData.Password !== value) {
        newErrors.ConfirmPassword = 'Passwords do not match.';
      } else {
        newErrors.ConfirmPassword = ''; // Clear the error if it's valid
      }
    }

    setErrors(newErrors);
  };

  return (
    <div className="registration-container">
      <h2 className="registration-title">Registration Form</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div>
          <TextField
            className='input'
            type="text"
            name="UserName"
            label="Username"
            variant="filled"
            fullWidth
            sx={{ marginBottom: 2, '& label.Mui-focused': {color: 'black'}}} 
            InputProps={{ disableUnderline: true }}
            value={formData.UserName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.UserName}
            helperText={errors.UserName || ' '}
          />
        </div>
        <div>
          <TextField
            className='input'
            type="email"
            name="Email"
            label="Email"
            variant="filled"
            fullWidth
            sx={{ marginBottom: 2, '& label.Mui-focused': {color: 'black'}}} 
            InputProps={{ disableUnderline: true }}
            value={formData.Email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.Email}
            helperText={errors.Email || ' '}
          />
        </div>
        <div>
          <TextField
            className='input'
            type={showPassword ? 'text' : 'password'}
            name="Password"
            label="Password"
            variant="filled"
            fullWidth
            sx={{ marginBottom: 2, '& label.Mui-focused': {color: 'black'}}} 
            value={formData.Password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.Password}
            helperText={errors.Password || ' '}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div>
          <TextField
            className='input'
            type='password'
            name="ConfirmPassword"
            label="Confirm Password"
            variant="filled"
            fullWidth
            sx={{ marginBottom: 2, '& label.Mui-focused': {color: 'black'}}} 
            InputProps={{ disableUnderline: true }}
            value={formData.ConfirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.ConfirmPassword}
            helperText={errors.ConfirmPassword || ' '}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: 2 }}
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegistrationForm;
