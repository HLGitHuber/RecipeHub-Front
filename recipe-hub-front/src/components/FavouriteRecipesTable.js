import { FavouriteRecipeRow } from './FavouriteRecipeRow';

export const FavouriteRecipeTable = ({rows})=>{
    return(
        <table>
            <thead>
                <tr>
                    <th><h5>Favourite recipes:</h5></th>
                    <th><h5>Cooking time</h5></th>
                </tr>
            </thead>
            <tbody>
            {rows.map((recipe, index) => {
                return(
                    <FavouriteRecipeRow key={index} recipe={recipe}/>
                )
            })}
            </tbody>
        </table>
    )
}