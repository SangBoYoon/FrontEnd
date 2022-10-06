import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { Provider } from 'react-redux';
import Router from './Router';
import store from './components/store/config';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

root.render(
    <Provider store={store}>
        <Router />
    </Provider>,
);

// const root = ReactDOM.createRoot(
//     document.getElementById('root') as HTMLElement,
// );
// root.render(<Router />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
