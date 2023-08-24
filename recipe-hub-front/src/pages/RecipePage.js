import React, { useState, useEffect } from 'react';
import { useLocation, useParams  } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import "../css/basicPage.css";
import apiSettings from '../config/apisettings.js'


const RecipePage = () => {

  const location = useLocation();
  let {id} = useParams();
  const { state } = location;
  const [checked, setChecked] = React.useState(false);
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const response = await fetch(apiSettings.apiUrlRecipe + id);
        const data = await response.json();
        setRecipe(data)
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    }
  
    fetchRecipe();
  }, []);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if(!checked) {
      alert('added to favorites')
    } else {
      alert('removed from favorites')
    }
  };


  const DisplayRecipe = () => {
    if (!recipe) {
      return <p>Loading...</p>; 
    }
    return (
      <div>

        <div className='recipeName'>
          <h2 className='heading'>{recipe.name}</h2> 
          <Checkbox onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }} 
            icon={<FavoriteBorder />} 
            checkedIcon={<Favorite />} />
        </div>
        <p className='text'>Time to prepare (in minutes): {recipe.preparationTimeMin}-{recipe.preparationTimeMax}</p>
        <p className='text'>Ingredients list:</p>
        <p className='text'>{recipe.ingredients}</p>
        <p className='text'>Description:</p>
        <p className='text'>{recipe.recipeText}</p>
      </div>
    )
  }

  return (
  <div className='background'>
      <div className='container'>

        {DisplayRecipe()}
      </div>
  </div>
  )
}

export default RecipePage