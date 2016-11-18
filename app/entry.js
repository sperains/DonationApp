// require('es5-shim');
// require('es5-shim/es5-sham');
// require('console-polyfill');

import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import  {Router , Route , IndexRoute , Redirect , browserHistory} from 'react-router';
import Main from './containers/Main';
import Active from './components/active/Active';
import NewActive from './components/active/newactive/NewActive';
import store from './store.js';




let root = $('#container')[0];

ReactDOM.render(
    <Provider store={store}>
    	<Router history={browserHistory}>
    		<Route  path="/" component={Main}>
    			<IndexRoute component={Active}/>
    			<Route path="/active" component={Active}/>
    			<Route path="/active-new" component={NewActive} />
    		</Route>
    	</Router>
    </Provider>,
    root
);