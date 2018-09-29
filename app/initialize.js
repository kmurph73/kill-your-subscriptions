import ReactDOM from 'react-dom';
import React from 'react';
import App from 'models/app.js';
import AppsView from 'components/apps_view.jsx';

let time = Date.now()

document.addEventListener('DOMContentLoaded', () => {
  fetch('subscription_apps.json').then(r => r.json()).then((json) => {
    window.apps = json.apps;

    ReactDOM.render(<AppsView />, document.querySelector('#app'));
  });
});
