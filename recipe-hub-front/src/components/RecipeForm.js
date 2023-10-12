import React, { useState } from 'react';
import "../css/registrationForm.css"
import axios from 'axios';
import apiSettings from '../config/apisettings';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField'; // Import TextField
import Button from '@mui/material/Button'; // Import Button

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
    preparationTimeMin: '',
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

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const newErrors = {...errors};

    if (name === 'name' && !value) {
      newErrors.name = 'Recipe name is required.';
    } else if (name === 'name') {
      newErrors.name = ''; 
    }

    if (name === 'preparationTimeMin' && !value) {
      newErrors.preparationTimeMin = 'Minimum preparation time is required.';
    } else if (name === 'preparationTimeMin') {
      newErrors.preparationTimeMin = ''; 
    }
  
    if (name === 'preparationTimeMax' && !value) {
      newErrors.preparationTimeMax = 'Maximum preparation time is required.';
    } else if (name === 'preparationTimeMax' && formData.preparationTimeMax < formData.preparationTimeMin) {
      newErrors.preparationTimeMax = 'Maximum preparation time has to be bigger than minimum.';
    } else if (name === 'preparationTimeMax') {
      newErrors.preparationTimeMax = ''; 
    }
  
    if (name === 'calories' && !value) {
      newErrors.calories = 'Calories are required.';
    } else if (name === 'calories') {
      newErrors.calories = ''; 
    }
  
    if (name === 'recipeText' && !value) {
      newErrors.recipeText = 'Recipe description is required.';
    } else if (name === 'recipeText' && value.length < 50) {
      newErrors.recipeText = 'Recipe description has to consist of at least 50 characters.';
    } else if (name === 'recipeText') {
      newErrors.recipeText = ''; 
    }
    setErrors(newErrors);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasErrors = Object.values(errors).some((error) => !!error);

    if (!hasErrors) {
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
          const recipeOwner = response.data.userId;

          navigate(`/add-ingredients/${newRecipeId}`, { state: { recipeOwner } });
        })
        .catch(error => {
          console.log('formData', formData);
          console.log('Error', error);
        })
    }
  };

  return (
    <div className="registration-container">
      <h2 className="registration-title">Recipe Form</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div>
          <TextField
            className='input'
            color='success' //error info success warning
            type="text"
            name="name"
            label="Recipe name"
            sx={{ mb: 2 }}
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur} // Handle blur event
            error={!!errors.name}
            helperText={errors.name || ' '}
          />
        </div>
        <div>
          <TextField
            className='input'
            type="number"
            color='success'
            name="preparationTimeMin"
            label="Minimum preparation time"
            value={formData.preparationTimeMin}
            onChange={handleChange}
            onBlur={handleBlur} // Handle blur event
            error={!!errors.preparationTimeMin}
            helperText={errors.preparationTimeMin || ' '}
          />
        </div>
        <div>
          <TextField
            className='input'
            type="number"
            color='success'
            name="preparationTimeMax"
            label="Maximum preparation time"
            value={formData.preparationTimeMax}
            onChange={handleChange}
            onBlur={handleBlur} // Handle blur event
            error={!!errors.preparationTimeMax}
            helperText={errors.preparationTimeMax || ' '}
          />
        </div>
        <div>
          <TextField
            className='input'
            type="number"
            color='success'
            name="calories"
            label="Calories"
            value={formData.calories}
            onChange={handleChange}
            onBlur={handleBlur} // Handle blur event
            error={!!errors.calories}
            helperText={errors.calories || ' '}
          />
        </div>
        <div>
          <TextField
            className='input'
            type="text"
            color='success'
            name="recipeText"
            label="Recipe description"
            multiline // Add this to make it multiline
            rows={4} // Customize the number of rows
            value={formData.recipeText}
            onChange={handleChange}
            onBlur={handleBlur} // Handle blur event
            error={!!errors.recipeText}
            helperText={errors.recipeText || ' '}
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Next Step
        </Button>
      </form>
    </div>
  );
};

export default RecipeForm;
