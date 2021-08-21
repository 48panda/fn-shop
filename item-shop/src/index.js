import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './colors.css';
import './Items.css';

import './marvel.css';
import './dc.css';
import './icon.css';

import './legendary.css';
import './epic.css';
import './rare.css';
import './uncommon.css';
import './common.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
