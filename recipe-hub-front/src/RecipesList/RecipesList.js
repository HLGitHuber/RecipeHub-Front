import React, {Component} from 'react';
import ClickForMoreButton from './ClickForMoreButton';


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

  displayRecipe(index) {
    const recipe = this.state.recipes[index];

    return (
        <div key={index}>
            <p>{recipe.name} {recipe.time} <ClickForMoreButton/></p>
            {/* <p>{recipe.name} {recipe.time} <button>Click</button></p> */}

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
        {this.displayAllRecipes()}
      </div>
    )
  }
}



export default RecipesList
