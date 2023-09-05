import React, { useState, useEffect, useParams }  from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import "../css/basicPage.css"
import apiSettings from '../config/apisettings.js'


function RecipesList() {

  let {searchingIngredients} = useParams();
  let searchQuery = ""

  const setQuery = () => {
    if (searchingIngredients.length === 1) {
      searchQuery = "?ingredientIds=" + searchingIngredients[0];
    } else if (searchingIngredients.length > 1) {
      searchQuery = "?ingredientIds=" + searchingIngredients[0];
      searchingIngredients.slice(1).forEach(element => {
        searchQuery += "&ingredientIds=" + element;
      });
    }
  }

  setQuery()

  // const [recipes, setRecipes] = useState([
  //   {
  //     id: 1,
  //     name: 'lorem',
  //     time: '20',
  //     description: 'lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur? ',
  //   },
  //   {
  //     id: 2,
  //     name: 'ipsum',
  //     time: '30',
  //     description: 'lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur? ',
  //   },
  //   {
  //     id: 3,
  //     name: 'dolorum',
  //     time: '40',
  //     description: 'lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur? ',
  //   }
  // ]); 

  const [recipes, setRecipes] = useState([]); 

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch(apiSettings.apiUrlRecipesList + searchQuery);
        const data = await response.json();
        const recipesList = data.map((item) => ({
          id: item.id,
          name: item.name, 
          timeMin: item.preparationTimeMin,
          timeMax: item.preparationTimeMax
        }));
        setRecipes(recipesList)
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    }
  
    fetchRecipes();
  }, []);

  const DisplayRecipe = (index) => {
      const recipe = recipes[index]

      return (
        <tr key={index}><td>{recipe.name}</td><td>{recipe.time}</td><td><Link to={`/recipe/${recipe.id}`} state={recipe}><Button variant="contained" 
        color="warning">Show recipe</Button></Link></td></tr>
      )
  }

const displayAllRecipes = () => {
  if (!recipes) {
    return <p>Loading...</p>; 
  }

  return recipes.map((recipe)=> DisplayRecipe(recipes.indexOf(recipe)))
}

    return (
        <div className='background'>
          <div className='container'>
            <h2 className='heading'>Recipes we've found for you</h2> 
            <table>
            <tr><th>Recipe name</th><th>Preparation time</th><th></th></tr>
            {displayAllRecipes()}
            </table>
          </div>
        </div>
      )
}

export default RecipesList