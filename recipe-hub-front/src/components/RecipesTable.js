import { RecipeRow } from './RecipeRow';

export const RecipeTable = ({rows})=>{
    return(
            <tbody>
            {rows.map((recipe, index) => {
                return(
                    <RecipeRow key={index} recipe={recipe}/>
                )
            })}
            </tbody>
    )
}