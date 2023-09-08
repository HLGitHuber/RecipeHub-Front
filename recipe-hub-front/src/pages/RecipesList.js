import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import "../css/basicPage.css";
import apiSettings from '../config/apisettings.js';
import HomeIcon from '@mui/icons-material/Home'; 

function RecipesList() {
  const location = useLocation();
  const [recipes, setRecipes] = useState([]);
  const [selectedPreparationTime, setSelectedPreparationTime] = useState('');
  const [selectedCalories, setSelectedCalories] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const selectedProducts = location.state.selectedProducts;

  useEffect(() => {
    if (!selectedProducts || selectedProducts.length === 0) {
      setIsLoading(false);
      return;
    }

    const ingredientIDs = selectedProducts.map((product) => `ingredientIDs=${product.id}`).join('&');
    const apiUrl = `${apiSettings.apiUrlRecipe}recipesbyingredients?${ingredientIDs}`;

    async function fetchRecipes() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setRecipes(data);
        setFilteredRecipes(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }

    fetchRecipes();
  }, []);

  const filterRecipes = () => {
    const updatedFilteredRecipes = recipes.filter((recipe) => {
      const prepTime = recipe.preparationTimeMin;
      const calories = recipe.calories;

      let prepTimeFilter = true;
      if (selectedPreparationTime === "<20") {
        prepTimeFilter = prepTime < 20;
      } else if (selectedPreparationTime === "20-40") {
        prepTimeFilter = prepTime >= 20 && prepTime <= 40;
      } else if (selectedPreparationTime === ">40") {
        prepTimeFilter = prepTime > 40;
      }

      let calorieFilter = true;
      if (selectedCalories === "<200") {
        calorieFilter = calories < 200;
      } else if (selectedCalories === "200-400") {
        calorieFilter = calories >= 200 && calories <= 400;
      } else if (selectedCalories === ">400") {
        calorieFilter = calories > 400;
      }

      return prepTimeFilter && calorieFilter;
    });

    setFilteredRecipes(updatedFilteredRecipes);
  };

  useEffect(() => {
    filterRecipes();
  }, [selectedPreparationTime, selectedCalories]);

  const DisplayRecipe = (recipe) => {
    return (
      <tr key={recipe.id}>
        <td>{recipe.name}</td>
        <td>{recipe.preparationTimeMin} - {recipe.preparationTimeMax} min.</td>
        <td>{recipe.calories}</td>
        <td>
          <Link to={`/Recipe/${recipe.id}`} state={recipe}>
            <Button variant="contained" color="warning">
              Show recipe
            </Button>
          </Link>
        </td>
      </tr>
    );
  };

  const displayAllRecipes = (recipeList) => {
    if (!recipeList || recipeList.length === 0) {
      return <p>No recipes found. It's possible that you didn't choose any ingredients.</p>;
    }

    return (
    <table>
      <thead>
        <tr>
          <th>Recipe name</th>
          <th>Preparation time</th>
          <th>Calories</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {recipeList.map((recipe) => DisplayRecipe(recipe))}
      </tbody>
    </table>
    )
  };

  return (
    <div className='background'>
      <div className='container'>
        <div className='header'>
            <h2 className='heading'>Recipes we've found for you</h2>
            <Link to="/">
              <HomeIcon className="home-icon" style={{ fontSize: 60, color: 'orange' }}/>
            </Link>
        </div>
        <div className="filters">
          <label>Preparation Time:</label>
          <select
            value={selectedPreparationTime}
            onChange={(e) => setSelectedPreparationTime(e.target.value)}
          >
            <option value="">Select</option>
            <option value="<20">&lt;20 min</option>
            <option value="20-40">20-40 min</option>
            <option value=">40">&gt;40 min</option>
          </select>

          <label>Calories:</label>
          <select
            value={selectedCalories}
            onChange={(e) => setSelectedCalories(e.target.value)}
          >
            <option value="">Select</option>
            <option value="<200">&lt;200</option>
            <option value="200-400">200-400</option>
            <option value=">400">&gt;400</option>
          </select>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          displayAllRecipes(filteredRecipes)
        )}
      </div>
    </div>
  );
}

export default RecipesList;