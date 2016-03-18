import React from 'react';
import { Link } from 'react-router';
import LogIn from './login';
import Landing from './landingpage';


var SearchBox = React.createClass({

    propTypes: {
        onSearch: React.PropTypes.func.isRequired
    },

    // grab the query value and put it into state
    // as the value may mutate as the user types
    getInitialState: function() {
        return {
            query: this.props.query || ''
        };
    },

    // if a change is ever propogated through properties
    componentWillReceiveProps: function(nextProps) {
        this.setState({ query: nextProps.query || '' });
    },

    doSearch:function(event){
        // grab the new value from the input text box
        var newQuery = event.target.value || '';
        this.setState({ query: newQuery });

        this.props.onSearch.call(this, newQuery);
    },
    render:function(){
        return (<input type="text"
                       className="Search"
                       placeholder="Search Name"
                       value={ this.state.query }
                       onChange={ this.doSearch }
        />);
    }
});

var Header = React.createClass({
    render: function(){
        return (
            <header className="main-header">
                <a className="site-logo" href="#logo">
                    <img src="" alt=""></img>
                </a>
                <ul className="nav">
                    <li><Link className="active" to="/">Home</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/search">Profiles</Link></li>
                </ul>
                <LogIn />
            </header>
        );
    }
});

export default Header;