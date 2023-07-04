import React, {Component, Router, Button, RouterLink} from 'react';
import { useNavigate } from "react-router-dom";
import RouterReact from "../Router/RouterReact";


class RecipesList extends Component{
  constructor(){
    super()
    this.state = {
      recipes: [
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
    }
  }

  displayAlert(){
    alert("you're recipe")
}

  displayRecipe(index) {
    const recipe = this.state.recipes[index]
    const navigate = useNavigate();

    return (
      <div key={index}>
        <p>{recipe.name} {recipe.time} <button onClick={this.displayAlert}>Click</button></p>

      </div>
    )
  }

  displayAllRecipes(){
    return this.state.recipes.map((recipe)=> this.displayRecipe(this.state.recipes.indexOf(recipe)))

  }

  render() {
    return (
      <div>
        <h2>Recipes</h2>
        <h4>Name        Time</h4>
        {this.displayAllRecipes()}
      </div>
    )
  }
}

export default RecipesList
