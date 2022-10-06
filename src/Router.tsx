import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RevenueStability from './components/Algorithm/RevenueStability';
import Currentratio from './components/Algorithm/Currentratio';
import CorporationInfo from './components/Corporation/CorporationInfo';
import LoginSuccess from './components/Login/LoginSuccess';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import Main from './components/Main/Main';

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route
                    path="/RevenueStability"
                    element={<RevenueStability />}
                />
                <Route path="/login/token" element={<LoginSuccess />} />
                <Route path="/Currentratio" element={<Currentratio />} />
                <Route path="/CorporationInfo" element={<CorporationInfo />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default Router;
