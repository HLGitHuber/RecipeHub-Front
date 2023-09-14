import React, {useEffect, useState} from 'react'
import { RecipeTable } from '../components/RecipesTable';
import settings from '../appsettings.json'
import "../css/userPage.css"
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home'; 
import { Link } from 'react-router-dom';

function UserPanel(){

    const favrecipes =[
        {name: "Meat lasagne", cooktime :35, id: 1},
        {name: "Spaghetti Bolognese", cooktime :30, id: 2},
        {name: "Chicken with rice", cooktime :20, id: 3},
    ]

        const userRecipes =[
        {name: "Vegan lasagne", cooktime :35, id: 1},
        {name: "Spaghetti Vegan", cooktime :30, id: 2},
        {name: "Vegetables with rice", cooktime :20, id: 3},
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
                <div className='header'>
                    <h2>This is your userpage</h2>
                    <Link to="/">
                    <HomeIcon className="home-icon" style={{ fontSize: 60, color: 'orange' }}/>
                    </Link>
                </div>
                <div className='second-header-container'>
                    <h3 className='second-heading'>User name: {data.userName}</h3>
                    <h3 className='second-heading'>Name: {data.firstName} {data.lastName}</h3>
                    <Link to="/add-recipe">
                        <Button color="warning" variant='contained'>Add new recipe</Button>
                    </Link>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th><h5>Favourite recipes:</h5></th>
                                <th><h5>Cooking time (in minutes)</h5></th>
                            </tr>
                        </thead>
                        <RecipeTable rows={favrecipes}/>
                    </table>
                    <table>
                        <thead>
                            <tr>
                                <th><h5>Your recipes:</h5></th>
                                <th><h5>Cooking time (in minutes)</h5></th>
                            </tr>
                        </thead>
                        <RecipeTable rows={userRecipes}/>
                    </table>
                </div>
            </div>
        </div>
            )
}

export default UserPanel