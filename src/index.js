import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { Provider } from 'react-redux'
import { getStore } from './store';
import { SettingsProvider } from './context/SettingsContext';
import { restoreSettings } from './utils/settings';

const myStore = getStore();
const settings = restoreSettings();
ReactDOM.render(
    <Provider store={myStore}>
        <SettingsProvider settings={settings}>
            <App />
        </SettingsProvider>
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
