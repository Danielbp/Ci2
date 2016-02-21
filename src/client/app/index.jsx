import React from 'react';
import {render} from 'react-dom';
import Container from './main';

class App extends React.Component {
    render () {
        return (
        <Container />
        );
    }
}

render(
    <App/>,
    document.getElementById('app')
);