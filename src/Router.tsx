import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import RevenueStability from './components/Algorithm/RevenueStability';
import Currentratio from './components/Algorithm/Currentratio';
import CorporationInfo from './components/Corporation/CorporationInfo';
import LoginSuccess from './components/Login/LoginSuccess';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import AccountingFraud from './components/Algorithm/AccountingFraud';
import DelistReason from './components/Algorithm/DelistReason';

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<App />} />
                <Route
                    path="/RevenueStability"
                    element={<RevenueStability />}
                />
                <Route path="/login/token" element={<LoginSuccess />} />
                <Route path="/Currentratio" element={<Currentratio />} />
                <Route path="/AccountingFraud" element={<AccountingFraud />} />
                <Route path="/CorporationInfo" element={<CorporationInfo />} />
                <Route path="/DelistReason" element={<DelistReason />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default Router;
