import React, {useEffect, useState} from 'react'
import { FavouriteRecipeTable } from '../components/FavouriteRecipesTable';
import settings from '../appsettings.json'
import "../css/basicPage.css"

function UserPanel(){
    const favrecipes =[
        {name: "Meat lasagne", cooktime :35, id: 1},
        {name: "Spaghetti Bolognese", cooktime :30, id: 2},
        {name: "Chicken with rice", cooktime :20, id: 3},
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
                <FavouriteRecipeTable rows={favrecipes}/>
            </div>
        </div>
            )
}

export default UserPanel