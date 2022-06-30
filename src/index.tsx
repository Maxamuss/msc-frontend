import React from 'react';
import ReactDOM from 'react-dom/client';

import DeveloperApp from './developer/core/App';
import UserApp from './user/core/App';
import './styles/output.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// if (window.location.host.split('.')[0])
const site = window.location.host.split('.')[1] ? window.location.host.split('.')[0] : 'user';
let App;

if (site == 'dev') {
  App = DeveloperApp;
} else {
  App = UserApp;
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
