import ReactDOM from 'react-dom';
import React from 'react';
import App from 'components/App';

let time = Date.now()

document.addEventListener('DOMContentLoaded', () => {
  fetch('/subscription_apps.json').then(r => r.json()).then((json) => {
    window.apps = json.apps.map((app) => {
      return {
        name: app,
        terse: app.toLowerCase().replace(/\s/, '')
      }
    });

    ReactDOM.render(<App />, document.querySelector('#app'));
  });
});
