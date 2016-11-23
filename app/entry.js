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
import ActiveDetail from './components/active/detail/Detail';
import Member from './components/member/Member';
import MemberDetail from './components/member/detail/Detail';
import Number from './components/number/Number';
import store from './store.js';




let root = $('#container')[0];

ReactDOM.render(
    <Provider store={store}>
    	<Router history={browserHistory}>
    		<Route  path="/" component={Main}>
    			<IndexRoute component={Active}/>
    			<Route path="/active" component={Active}/>
    			<Route path="/active-new" component={NewActive} />
                                    <Route path="/active-detail" component={ActiveDetail} />
                                    <Route path="/member" component={Member} />
                                    <Route path="/member-detail" component={MemberDetail} />
                                    <Route path="/number" component={Number} />
    		</Route>
    	</Router>
    </Provider>,
    root
);