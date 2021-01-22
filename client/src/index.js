import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import store from './store';
import './scss/animation.scss';
import './scss/index.scss';
import './scss/media_queries.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MaintenancePage } from './pages';

const maintenance = false;

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>{maintenance ? <MaintenancePage /> : <App />}</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
