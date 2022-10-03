import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import RevenueStability from './components/Algorithm/RevenueStability';
import Currentratio from './components/Algorithm/Currentratio';
import CorporationInfo from './components/Corporation/CorporationInfo';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route
                    path="/RevenueStability"
                    element={<RevenueStability />}
                />
                <Route path="/Currentratio" element={<Currentratio />} />
                <Route path="/CorporationInfo" element={<CorporationInfo />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
