import React from 'react';
import {render} from 'react-dom';
import { Router, Route, hashHistory, IndexRoute} from 'react-router'
import App from './app'
import About from './about';
import Contact from './contact';
import Profile from './profile';
import Landing from './landingpage';

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Landing}/>
            <Route path="/about" component={About}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/profile" component={Profile}/>
        </Route>
    </Router>
), document.getElementById('app'));