import React, {useState} from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import "../css/basicPage.css"

function RecipesList() {

  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: 'lorem',
      time: '20',
    },
    {
      id: 2,
      name: 'ipsum',
      time: '30',
    },
    {
      id: 3,
      name: 'dolorum',
      time: '40',
    }
  ]); 


  const DisplayRecipe = (index) => {
      const recipe = recipes[index]

      return (
        <div key={index}>
          <p>{recipe.name} {recipe.time} 
          <Link to={"/recipe"} state={recipe}><Button variant="contained" color="warning">recipe</Button></Link>
          </p>
        </div>
      )
  }

const displayAllRecipes = () => {
  return recipes.map((recipe)=> DisplayRecipe(recipes.indexOf(recipe)))
}

    return (
        <div className='background'>
          <div className='container'>
            <h2>Recipes</h2>
            <h4>Name        Time</h4>
            {displayAllRecipes()}
          </div>
        </div>
      )
}

export default RecipesList
