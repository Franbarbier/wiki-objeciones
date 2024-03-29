// import './index.css';
import React from 'react'
import ReactDOM from'react-dom'
import {Provider} from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import reducers from './reducers';

import App from './App'


const store = createStore(reducers, compose(applyMiddleware(thunk)))

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <App /> 
    </Provider>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
