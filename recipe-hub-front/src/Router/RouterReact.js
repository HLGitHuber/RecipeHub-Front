import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './NotFound';
import Homepage from './Homepage';
import Search from '../Search/Search';
import RecipePage from '../RecipePage/RecipePage';
import RecipesList from '../RecipesList/RecipesList';
import UserPanel from '../UserPanel/UserPanel';

const RouterReact = () => {

    return (
    <Router>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/recipes" element={<RecipesList/>} />
            <Route path="/recipe/:id" element={<RecipePage/>} />
            <Route path="/userpanel" element={<UserPanel/>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
    )

}

export default RouterReact;