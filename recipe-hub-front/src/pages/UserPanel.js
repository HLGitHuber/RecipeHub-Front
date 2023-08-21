import React, {useEffect, useState} from 'react'
import { FavouriteRecipeRow } from '../components/FavouriteRecipeRow';
import { FavouriteRecipeTable } from '../components/FavouriteRecipesTable';
import settings from '../appsettings.json'
import "../css/basicPage.css"

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
        <div className='background'>
            <div className='container'>
                <h3 className='heading'>User name: {data.userName}</h3>
                <p className='heading'>Name: {data.firstName} {data.lastName}</p>
                {/* <tr>
                <th><h5>Favourite recipes:</h5></th>
                <th><h5>Cooking time</h5></th>
                </tr>
                {favrecipes.map((recipe, key)=>{
                    return(
                        <FavouriteRecipeRow index={key} name={recipe.name} cooktime={recipe.cooktime}/>
                    )
                })} */}

                <FavouriteRecipeTable rows={favrecipes}/>
            </div>
        </div>
            )
}

export default UserPanel