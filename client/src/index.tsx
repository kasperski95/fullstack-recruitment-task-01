import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { App } from './main';
import { reportWebVitals } from './report-web-vitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(/*console.log*/);
