import React, {useEffect, useState} from 'react'
import { RecipeTable } from '../components/RecipesTable';
import "../css/userPage.css"
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home'; 
import { Link } from 'react-router-dom';
import apiSettings from '../config/apisettings.js';

function UserPanel(){

    const [favRecipes, setFavRecipes] = useState([]);
    const [userRecipes, setUserRecipes] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);

   useEffect(() => {
    const apiUrl = ``; //tu nie ma endpointu

    const fetchCurrentUser = async () => {
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          setCurrentUser(data);
        } catch (error) {
          console.error('Error fetching current user:', error);
        }
      };
      fetchCurrentUser();
  }, []);

    useEffect(() => {
        const apiUrl = `${apiSettings.apiUrlFavourites}/${currentUser.id}`;
    
        const fetchFavoriteRecipes = async () => {
            if (currentUser) {
              try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setFavRecipes(data);
              } catch (error) {
                console.error('Error fetching favorite recipes:', error);
              }
            }
          };
          fetchFavoriteRecipes();
      }, []);

      useEffect(() => {
        const apiUrl = ``; //tu nie ma endpointu
    
        const fetchUserRecipes = async () => {
            if (currentUser) {
              try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setUserRecipes(data);
              } catch (error) {
                console.error('Error fetching user recipes:', error);
              }
            }
          };
          fetchUserRecipes();
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
                    <h3 className='second-heading'>User name: {currentUser.userName}</h3>
                    <h3 className='second-heading'>Name: {currentUser.firstName} {currentUser.lastName}</h3>
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
                        <RecipeTable rows={favRecipes}/>
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