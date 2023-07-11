import React from 'react';
import { useLocation, useParams  } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import "../css/basicPage.css";

const RecipePage = () => {

  const location = useLocation();
  let {id} = useParams();
  const { state } = location;
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if(!checked) {
      alert('added to favorites')
    } else {
      alert('removed from favorites')
    }
  };

  const DisplayRecipe = () => {
    return (
      <div>
        <p>{id}</p>
        <div>
          <Checkbox onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }} 
            icon={<FavoriteBorder />} 
            checkedIcon={<Favorite />} />
        </div>

      </div>
    )
  }


  //for demo
  // const DisplayRecipe = () => {
  //   return (
  //     <div>
  //       <h2 className='heading'>{state.name}</h2> 
  //       <div>
  //         <Checkbox onChange={handleChange}
  //           inputProps={{ 'aria-label': 'controlled' }} 
  //           icon={<FavoriteBorder />} 
  //           checkedIcon={<Favorite />} />
  //       </div>
  //       <p className='text'>Time to prepare: {state.time}</p>
  //       <p className='text'>{state.text}</p>
  //       <p className='text'>Description:</p>
  //       <p className='text'>{state.description}</p>
  //     </div>
  //   )
  // }

  return (
  <div className='background'>
      <div className='container'>
        {DisplayRecipe()}
      </div>
  </div>
  )
}

export default RecipePage