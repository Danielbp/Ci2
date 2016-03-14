import React from 'react';
import {render} from 'react-dom';
import { Router, Route, hashHistory, browserHistory, IndexRoute} from 'react-router'
import App from './app'
import About from './about';
import Contact from './contact';
import Profile from './profile';
import Landing from './landingpage';
import Search from './search';

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Landing}/>
            <Route path="/about" component={About}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/search" component={Search}/>
            <Route path="/profile" component={Profile}/>
        </Route>
    </Router>
), document.getElementById('app'));