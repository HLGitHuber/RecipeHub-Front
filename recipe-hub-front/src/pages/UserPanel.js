import React, {useEffect, useState} from 'react'
import { FavouriteRecipe } from '../components/FavouriteRecipe';
import settings from '../appsettings.json'

function UserPanel(){
    const favrecipes =[
        {name: "Meat lasagne", cooktime :35},
        {name: "Spaghetti Bolognese", cooktime :30},
        {name: "Chicken with rice", cooktime :20},
    ]
    

   const [data, setData] = useState([])
   useEffect(()=>{
    async function fetchData(){
        try{
            var loggedUserID=1;  
            const response = await fetch(settings.UserDataAPI+loggedUserID)
            const json = await response.json();
            setData(json);
        } catch (error){
            console.log('Error fetching data: ', error)
        }}
        fetchData();
    }, []);
    return(
<div class= 'Main'>
<style>
        {'body { background-color: #8f8f24; }'}
    </style>
<h3>User name: {data.userName}</h3>

<p>Name: {data.firstName} {data.lastName}</p>
<tr>
<th><h5>Favourite recipes:</h5></th>
<th><h5>Cooking time</h5></th>
</tr>
{favrecipes.map((recipe, key)=>{
    return(
        <FavouriteRecipe index={key} name={recipe.name} cooktime={recipe.cooktime}/>
    )
})}
</div>
    )
}

export default UserPanel