import { Button, Link } from '@mui/material';

export const RecipeRow = ({recipe}) => {
    return(
        <tr>
            <td>{recipe.name}</td>
            <td>{recipe.cooktime}</td>
            <td><Link to={`/recipe/${recipe.id}`}><Button color="warning" variant='contained'>See Details</Button></Link></td>
        </tr>
    )
}