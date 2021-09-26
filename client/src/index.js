import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"; //Accordion


const element = (
    <Router>
        <App />
    </Router>
);

ReactDOM.render(element, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}
