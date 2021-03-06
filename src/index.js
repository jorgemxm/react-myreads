import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

import './assets/css/index.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// TODO: Enable Service Worker once Secure Domains are configured properly
// - https://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
// registerServiceWorker();
