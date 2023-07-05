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
        <p><h3>{recipe.name}</h3> Time to prepare: {recipe.time}</p>
        <p/>
        <p>{recipe.text}</p>
        <p>Id from link is {}</p>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.displayRecipe()}
      </div>
    )
  }
}


export default RecipePage