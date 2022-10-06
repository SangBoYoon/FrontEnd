import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CorporationInfo from './components/Corporation/CorporationInfo';
import LoginSuccess from './components/Login/LoginSuccess';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import Main from './components/Main/Main';
import ServiceIntro from './components/ServiceIntro';
import StockFinder from './components/StockFinder/StockFinder';
import CorpAnalysis from './components/Algorithm/CorpAnalysis';

import ScrollToTop from './components/Common/ScrollToTop';

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/service" element={<ServiceIntro />} />
                <Route path="/corporations" element={<StockFinder />} />
                <Route
                    path="/corporations/:corpCode"
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
