import React from 'react';
import { useLocation } from 'react-router-dom';



const RecipePage = () => {

  const location = useLocation();
  const { state } = location;

  const DisplayRecipe = () => {
    return (
      <div>
        <p><h3>{state.name}</h3> Time to prepare: {state.time}</p>
        <p/>
        <p>{state.text}</p>
        <p>Id from link is {state.id}</p>
      </div>
    )
}

return (
  <div>
  {DisplayRecipe()}
</div>
)

}


export default RecipePage