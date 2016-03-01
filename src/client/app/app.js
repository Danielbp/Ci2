import React from 'react';
import Header from './main';
import Main from './main';
import Landing from './landingpage';

export default React.createClass({
    render() {
        return (
            <div className="container">

                <Header />

                {this.props.children}
            </div>
        )
    }
})