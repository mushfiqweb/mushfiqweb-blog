import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import App from "./app";
import ReactGA from 'react-ga';

import 'semantic-ui-css/semantic.min.css';
import './Style/style.css';
import './Style/fonts/fonts.css';
import './Style/froala_editor.pkgd.min.css';
import './Style/froala_style.min.css';


//global store
import configureStore from './store';

ReactGA.initialize('UA-109501400-1');

ReactDOM.render(
	<Provider store={configureStore()}>
		<BrowserRouter>
			
			<Route path='/' component={App} />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);


