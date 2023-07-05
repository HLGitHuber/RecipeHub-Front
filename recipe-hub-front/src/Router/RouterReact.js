import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './NotFound';
import Homepage from './Homepage';
import Search from '../Search/Search';
import RecipePage from '../RecipePage/RecipePage';
import RecipesListNonClass from '../RecipesList/RecipesListNonClass';

const RouterReact = () => {

    return (
    <Router>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/recipe" element={<RecipePage/>} />
            <Route path="/recipes" element={<RecipesListNonClass/>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
    )

}

export default RouterReact;