export const FavouriteRecipe = (props)=>{
    return(
        <tr>
            <th>{props.name}</th>
            <th>{props.cooktime}</th>
            <th><button>See Details</button></th>
            <th><button>Remove</button></th>
        </tr>
    )
}