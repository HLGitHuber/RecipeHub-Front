import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Homepage from '../pages/Homepage';
import RecipePage from '../pages/RecipePage';
import RecipesList from '../pages/RecipesList';
import UserPanel from '../pages/UserPanel';
import RegistrationPage from '../pages/RegistrationPage';
import AddRecipePage from '../pages/AddRecipe';


const RouterReact = () => {

    return (
    <Router>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/recipes" element={<RecipesList/>} />
            <Route path="/recipe/:id" element={<RecipePage/>} />
            <Route path='/registration' element={<RegistrationPage/>} />
            <Route path="/userpanel" element={<UserPanel/>} />
            <Route path="/add-recipe" element={<AddRecipePage/>}/>
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
    )

}

export default RouterReact;