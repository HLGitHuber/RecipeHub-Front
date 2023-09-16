import React, { useState } from 'react';
import "../css/registrationForm.css"
import axios from 'axios';
import apiSettings from '../config/apisettings';
import { useNavigate } from 'react-router-dom';

const RecipeForm = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    name: '',
    preparationTimeMin: 0,
    preparationTimeMax: 0,
    calories: '',
    recipeText: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    empreparationTimeMinail: '',
    preparationTimeMax: '',
    calories: '',
    recipeText: '',
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
    if (!formData.name) {
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
    if (!formData.recipeText) {
      newErrors.recipeText = 'Recipe description is required.';
    }
    if (formData.recipeText.length<100) {
      newErrors.recipeText = 'Recipe description has to consist of at least 100 signs.';
    }


    if (Object.keys(newErrors).length === 0) {
      axios({
        method: 'post',
        url: apiSettings.apiUrlAddRecipe,
        data: formData,
        headers: {
          'Content-Type': 'application/json-patch+json',
          'Authorization': `Bearer ${token}`,
        }
      })
        .then(response => {
          const newRecipeId = response.data.id;

          navigate(`/add-ingredients/${newRecipeId}`)
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
        <span className="error">{errors.name}</span>
          <input
            className='input'
            type="text"
            name="name"
            placeholder="Recipe name"
            sx={{ backgroundColor: 'bisque', ml: 1, flex: 1 }}
            value={formData.name}
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
            placeholder="calories"
            value={formData.calories}
            onChange={handleChange}
          />
        </div>
        <div>
        <span className="error">{errors.recipeText}</span>
          <textarea
            className='input'
            type="text"
            name="recipeText"
            placeholder="recipe description"
            value={formData.recipeText}
            onChange={handleChange}
            rows="7" 
            cols="70"
          />
        </div>
        <button type="submit">next step</button>
      </form>
    </div>
  );
};

export default RecipeForm;
