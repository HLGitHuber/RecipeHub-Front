import React from 'react'
import { useNavigate } from "react-router-dom";


const recipes = [
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
]

function displayRecipe(index) {
    
        const recipe = recipes[index]
        //const navigate = useNavigate();
    
        return (
          <div key={index}>
            <p>{recipe.name} {recipe.time} 

            <button onClick={() => useNavigate("/recipe/")}>Go to recipe</button>
          </p>
          </div>
        )
      
}

function displayAllRecipes() {
    return recipes.map((recipe)=> displayRecipe(recipes.indexOf(recipe)))
}

function RecipesListNonClass() {
    return (
        <div>
          <h2>Recipes</h2>
          <h4>Name        Time</h4>
          {displayAllRecipes()}
        </div>
      )
}

export default RecipesListNonClass
