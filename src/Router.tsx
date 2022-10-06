import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';

import CorporationInfo from './components/Corporation/CorporationInfo';
import LoginSuccess from './components/Login/LoginSuccess';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import ServiceIntro from './components/ServiceIntro';
import StockFinder from './components/StockFinder/StockFinder';
import CorpAnalysis from './components/Algorithm/CorpAnalysis';

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/ServiceIntro" element={<ServiceIntro />} />
                <Route path="/StockFinder" element={<StockFinder />} />
                <Route
                    path="/StockFinder/:corpCode"
                    element={<CorpAnalysis />}
                />
                <Route path="/login/token" element={<LoginSuccess />} />
                <Route path="/CorporationInfo" element={<CorporationInfo />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default Router;
