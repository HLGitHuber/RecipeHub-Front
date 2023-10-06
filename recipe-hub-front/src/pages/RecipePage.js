import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import TimerIcon from '@mui/icons-material/Timer';
import KitchenIcon from '@mui/icons-material/Kitchen';
import CalculateIcon from '@mui/icons-material/Calculate';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import "../css/basicPage.css";
import apiSettings from '../config/apisettings.js';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const RecipePage = () => {
  const location = useLocation();
  let { id } = useParams();
  const { state } = location;
  const [checked, setChecked] = useState(false);
  const [recipe, setRecipe] = useState(null); // Initialize as null
  const [ingredients, setIngredients] = useState(null); // Initialize as null
  const [userId, setUserId] = useState(null); // Initialize as null, TODO: somehow needed to be set

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const response = await fetch(apiSettings.apiUrlRecipe + id);
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    }

    fetchRecipe();
  }, [id]); 

  useEffect(() => {
    async function fetchIngredientsForRecipe() {
      try {
        const response = await fetch(apiSettings.apiUrlIngredientsForRecipe + id);
        const data = await response.json();
        setIngredients(data.value);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    }

    fetchIngredientsForRecipe();
  }, [id]); 


  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (userId === null) {
      alert('You need to log in first, go to homepage and click the login');
    }
    else {
      if (!checked) {
        //TODO here post request
        alert('added to favorites');
      } else {
        //TODO here delete request
        alert('removed from favorites');
      }
    }
  };

  const DisplayIngredients = ({ ingredients }) => {
    if (!ingredients || ingredients.length === 0) {
      return <p>No ingredients available.</p>;
    }
  
    return (
      <div>
        <h4 className='text'><KitchenIcon className='icon'/> Ingredients list:</h4>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li className='text' key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    );
  };
  

  const DisplayRecipe = () => {
    if (!recipe) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <div className='recipeName'>
          <h2 className='heading'>{recipe.name}</h2>
          <Checkbox
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
          />
        </div>
        <h4 className='text'><TimerIcon className='icon'/> Time to prepare (in minutes): {recipe.preparationTimeMin}-{recipe.preparationTimeMax}</h4>
        <h4 className='text'><KitchenIcon className='icon'/> Ingredients list:</h4>
        {DisplayIngredients({ ingredients })}
        <h4 className='text'><CalculateIcon className='icon'/> Calories: {recipe.calories}</h4>
        <h4 className='text'><TextSnippetIcon className='icon'/> Description:</h4>
        <p className='text'>{recipe.recipeText}</p>
      </div>
    )
  }

  return (
    <div className='background'>
      <div className='container'>
        <Link to="/" className='home-link'>
          <HomeIcon className="home-icon" style={{ fontSize: 60, color: 'orange' }} />
        </Link>
        {DisplayRecipe()}
        <div className='summing-icon'>
          <DinnerDiningIcon sx={{ color: 'orange', fontSize: 250 }} />
        </div>
      </div>
    </div>
  )
}

export default RecipePage;
