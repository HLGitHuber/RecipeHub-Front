import React, {Component} from 'react';


class RecipePage extends Component{
  constructor(){
    super()
    this.state = {
      recipe: {
          id: 1,
          name: 'lorem',
          time: '20',
          text: 'ipsum et dolorum'
        }
    }
  }

  displayRecipe() {
    const recipe = this.state.recipe
    return (
      <div>
        <p><h3>{recipe.name}</h3> {recipe.time}</p>
        <p>{recipe.text}</p>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h4>Name Time</h4>
        {this.displayRecipe()}
      </div>
    )
  }
}


export default RecipePage