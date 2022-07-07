import React from 'react';
import ReactDOM from 'react-dom/client';

import DeveloperApp from './developer/core/App';
import UserApp from './user/core/App';
import './styles/output.css';
import { Provider } from 'react-redux';
import store from './user/store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const site = window.location.host.split('.')[1] ? window.location.host.split('.')[0] : 'user';
let App;

if (site == 'dev') {
  App = <DeveloperApp />;
} else {
  App = (
    <Provider store={store}>
      <UserApp />
    </Provider>
  )
}

root.render(
  <React.StrictMode>
    {App}
  </React.StrictMode>
);
