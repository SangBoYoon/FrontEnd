import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import Router from './Router';
import { getUserLocalStorage } from './services/userControl';
import store from './store/config';
import { saveUser } from './store/slices/userSlice';

const loadUser = () => {
    try {
        const parsedUserInfo = getUserLocalStorage();
        if (!parsedUserInfo) return;
        store.dispatch(saveUser(parsedUserInfo));
    } catch (e) {
        console.log('localStorage err');
    }
};

loadUser();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <Provider store={store}>
        <Router />
    </Provider>,
);
