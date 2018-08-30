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
import "react-placeholder/lib/reactPlaceholder.css";
//global store
import configureStore from './store';
import firebase from 'firebase/app';

ReactGA.initialize('UA-109501400-1');

/*

apiKey: "AIzaSyC-EC-kXGbt8fv8ne3UDO6zXLdUkJ4bcqg",
authDomain: "mushfiqweb-frontend.firebaseapp.com",
databaseURL: "https://mushfiqweb-frontend.firebaseio.com",
projectId: "mushfiqweb-frontend",
storageBucket: "mushfiqweb-frontend.appspot.com",
messagingSenderId: "801823822345"    
 
*/

var config = {
	apiKey: "AIzaSyC-EC-kXGbt8fv8ne3UDO6zXLdUkJ4bcqg",
	authDomain: "mushfiqweb-frontend.firebaseapp.com",
	databaseURL: "https://mushfiqweb-frontend.firebaseio.com",
	storageBucket: "mushfiqweb-frontend.appspot.com",
};
firebase.initializeApp(config);

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


