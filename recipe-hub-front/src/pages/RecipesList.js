import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import '../css/basicPage.css';
import apiSettings from '../config/apisettings.js'

function RecipesList() {
  const location = useLocation();
  const [recipes, setRecipes] = useState([]);
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
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }
  
    fetchRecipes();
  }, [selectedProducts]);

  const DisplayRecipe = (recipe) => {
    console.log(recipe)
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

  const displayAllRecipes = () => {
    if (!recipes || recipes.length === 0 ) {
      return <p>No recipes found. It's possible that you didn't choose any ingredients.</p>;
    }
  
    return recipes.map((recipe) => DisplayRecipe(recipe));
  };

  return (
    <div className='background'>
      <div className='container'>
        <h2 className='heading'>Recipes we've found for you</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Recipe name</th>
                <th>Preparation time</th>
                <th>Calories</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{displayAllRecipes()}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default RecipesList;
