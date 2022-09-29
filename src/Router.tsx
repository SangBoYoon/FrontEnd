import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import RevenueStability from './components/Algorithm/RevenueStability';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route
                    path="/RevenueStability"
                    element={<RevenueStability />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
