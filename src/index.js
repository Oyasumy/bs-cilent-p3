import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'semantic-ui-css/semantic.min.css'
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
// import 'react-awesome-slider/src/styles.js';
import 'react-awesome-slider/dist/styles.css';
// import 'sweetalert2/src/sweetalert2.scss'
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
