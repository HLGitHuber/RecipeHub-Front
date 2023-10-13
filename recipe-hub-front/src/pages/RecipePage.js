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
  const [recipe, setRecipe] = useState(null);

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

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (!checked) {
      alert('added to favorites');
    } else {
      alert('removed from favorites');
    }
  };

  const DisplayIngredients = ({ recipe }) => {
    if (!recipe || !recipe.ingredients || recipe.ingredients.length === 0) {
      return <p></p>;
    }

    const ingredientList = recipe.ingredients.join('; ');

    return (
      <div>
        <p className='text'>{ingredientList}</p>
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
        {DisplayIngredients({ recipe })}
        <h4 className='text'><CalculateIcon className='icon'/> Calories:</h4>
        <p className='text'>{recipe.calories}</p>
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
