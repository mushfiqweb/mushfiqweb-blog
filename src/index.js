import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import App from "./app";
import ReactGA from 'react-ga';
import { CookiesProvider } from 'react-cookie';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import 'semantic-ui-css/semantic.min.css';
import './Style/style.css';

//global store
import configureStore from './store';

ReactGA.initialize('UA-109501400-1');

ReactDOM.render(
	<Provider store={configureStore()}>
		<BrowserRouter>
			<CookiesProvider>
				<Route path='/' component={App} />
			</CookiesProvider>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);


