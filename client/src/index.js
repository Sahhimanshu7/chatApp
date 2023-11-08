//          @copyright Himanshu Sah 2023
//                MERN-chatApp
// A complete chat website while users can find their friends, if they are on the app and connect with them
// This is a free website and build for educational purpose. I am not responsible for any breach of data privacy.
// For more information contact: himanshusah41@gmail.com.


// This is the starting point of the frontend application where the "App" is rendered

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux'
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store = { store }>
        <App />
    </Provider>
);
