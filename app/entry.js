// require('es5-shim');
// require('es5-shim/es5-sham');
// require('console-polyfill');

import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import  {Router , Route , IndexRoute , Redirect , hashHistory} from 'react-router';
//import createHistory from 'history/lib/createHashHistory';
import Main from './containers/Main';
import store from './store.js';




let root = $('#container')[0];



// const history = createHistory();

ReactDOM.render(
    <Provider store={store}>
    	<Router history={hashHistory}>
    		<Route  path="/" component={Main}/>
    	</Router>
    </Provider>,
    root
);