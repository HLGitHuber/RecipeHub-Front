import { Button } from '@mui/material';

export const FavouriteRecipeRow = (recipe)=>{
    return(
        <tr>
            <td>{recipe.name}</td>
            <td>{recipe.cooktime}</td>
            <td><Button color="warning" variant='contained'>See Details</Button></td>
            <td><Button color="warning" variant='contained'>Remove from favs</Button></td>
        </tr>
    )
}