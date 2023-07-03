import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './NotFound';
import Homepage from './Homepage';
import Search from '../Search/Search';

const RouterReact = () => {

    return (
    <Router>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
    )

}

export default RouterReact;