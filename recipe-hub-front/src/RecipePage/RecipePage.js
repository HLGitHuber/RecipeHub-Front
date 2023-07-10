import React from 'react';
import { useLocation } from 'react-router-dom';
import "../css/basicPage.css"

const RecipePage = () => {

  const location = useLocation();
  const { state } = location;

  const DisplayRecipe = () => {
    return (
      <div>
        <h2 className='heading'>{state.name}</h2> 
        <p className='text'>Time to prepare: {state.time}</p>
        <p className='text'>{state.text}</p>
        <p className='text'>Description:</p>
        <p className='text'>{state.description}</p>
      </div>
    )
}

//adding fav button 

return (
  <div className='background'>
    <div className='container'>
      {DisplayRecipe()}
    </div>
</div>
)

}

export default RecipePage