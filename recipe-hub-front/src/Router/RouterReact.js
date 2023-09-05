import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Homepage from '../pages/Homepage';
import Search from '../pages/Search';
import RecipePage from '../pages/RecipePage';
import RecipesList from '../pages/RecipesList';
import Login from '../pages/Login';
import UserPanel from '../pages/UserPanel';
import RegistrationPage from '../pages/RegistrationPage';


const RouterReact = () => {

    return (
    <Router>
        <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/search" element={<Search />} />
            <Route path="/recipes" element={<RecipesList/>} />
            <Route path="/recipe/:id" element={<RecipePage/>} />
            <Route path="/login" element={<Login/>} />
            <Route path='/registration' element={<RegistrationPage/>} />
            <Route path="/userpanel" element={<UserPanel/>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
    )

}

export default RouterReact;