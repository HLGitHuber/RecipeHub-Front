import React, { useState } from 'react';
import "../css/registrationForm.css"
import axios from 'axios';
import apiSettings from '../config/apisettings';
import { useNavigate } from 'react-router-dom';

const RecipeForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    recipeName: '',
    preparationTimeMin: '',
    preparationTimeMax: '',
    calories: '',
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

 
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.recipeName) {
      newErrors.recipeName = 'Recipe name is required.';
    }
    if (!formData.preparationTimeMin) {
      newErrors.preparationTimeMin = 'Minimum preparation time is required.';
    }
    if (!formData.preparationTimeMax) {
      newErrors.preparationTimeMax = 'Maximum preparation time is required.';
    }
    if (formData.preparationTimeMax<formData.preparationTimeMin) {
        newErrors.preparationTimeMax = 'Maximum preparation time has to be bigger than minimum.';
    }
    if (!formData.calories) {
      newErrors.calories = 'Calories are required.';
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
      <h2 className="registration-title">Recipe Form</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div>
        <span className="error">{errors.recipeName}</span>
          <input
            className='input'
            type="text"
            name="recipeName"
            placeholder="recipeName"
            sx={{ backgroundColor: 'bisque', ml: 1, flex: 1 }}
            value={formData.recipeName}
            onChange={handleChange}
          />
        </div>
        <div>
        <span className="error">{errors.preparationTimeMin}</span>
          <input
            className='input'
            type="number"
            name="preparationTimeMin"
            placeholder="preparationTimeMin"
            value={formData.preparationTimeMin}
            onChange={handleChange}
          />
        </div>
        <div>
        <span className="error">{errors.preparationTimeMax}</span>
          <input
            className='input'
            type="number"
            name="preparationTimeMax"
            placeholder="preparationTimeMax"
            value={formData.preparationTimeMax}
            onChange={handleChange}
          />
        </div>
        <div>
        <span className="error">{errors.calories}</span>
          <input
            className='input'
            type="number"
            name="calories"
            placeholder="calories password"
            value={formData.calories}
            onChange={handleChange}
          />
        </div>
        <button type="submit">next step</button>
      </form>
    </div>
  );
};

export default RecipeForm;
