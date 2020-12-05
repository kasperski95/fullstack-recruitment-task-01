import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './main';
import { reportWebVitals } from './report-web-vitals';
import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(/*console.log*/);
