import { Button, Link } from '@mui/material';

export const FavouriteRecipeRow = ({recipe}) => {
    return(
        <tr>
            <td>{recipe.name}</td>
            <td>{recipe.cooktime}</td>
            <td><Link to={`/recipe/${recipe.id}`}><Button color="warning" variant='contained'>See Details</Button></Link></td>
            {/* here perform action of removing from favs */}
            <td><Button color="warning" variant='contained' onClick={() => alert(recipe.name + " removed from favs")}>Remove from favs</Button></td> 
        </tr>
    )
}