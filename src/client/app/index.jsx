import React from 'react';
import {render} from 'react-dom';
import { Router, Route, hashHistory, IndexRoute  } from 'react-router'
import Container from './main';
import About from './about';
import Contact from './contact';
import Landing from './landingpage';


//FIX ROUTING MAKE A ROUTING.JS FILE

class App extends React.Component {
    render () {
        return (
        <Container />
        );
    }
}

//        <IndexRoute component={Landing} />

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
        <Route path="/home" component={Landing}/>
        <Route path="/about" component={About}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/main" component={Container}/>
    </Router>
), document.getElementById('app'));