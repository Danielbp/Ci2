import React from 'react';
import { Link } from 'react-router';
import Rebase from 're-base';
var base = Rebase.createClass('https://commoni.firebaseio.com/');
var authData = base.getAuth();

//FIND OUT HOW TO PASS VALUES FROM OTHER COMPONENTS

var user = {
    name: ''
};

var LogIn = React.createClass ({
    getInitialState: function() {
        return {
            login: true,
            logout: false
        };
    },
    onLogin: function(event) {
        this.setState({
            login: !this.state.login,
            logout: !this.state.logout
        });
    },
    render : function(){
        return (
            <ul  className="login" onClick={this.onLogin}>
                { this.state.login ? <Li/> : null }
                { this.state.logout ? <Lo/> : null }
            </ul>
        );
    }

});

/*
<li><Link onClick={this.handleLogin} className="filledBtn" to="/profile">SIGN IN</Link></li>
<li><Link onClick={this.getInitialState} className="transBtn" to="/">LOG OUT</Link></li>
*/

function authDataCallback(authData) {
    if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
    } else {
        console.log("User is logged out");
    }
}

var ref = new Firebase("https://commoni.firebaseio.com/");
ref.onAuth(authDataCallback);


var Li = React.createClass({
    getInitialState: function() {
        return {
            about: ''
        };
    },
    handleLogin: function (){
        base.authWithOAuthPopup("google", authData);
        base.post('users/' + authData.uid + '/', {
            data: {name: authData.google.displayName, provider: authData.provider, about: authData.about}
        });
    },

    render: function() {
        return (

                <li><Link onClick={this.handleLogin} className="filledBtn" to="/profile">SIGN IN</Link></li>

        );
    }
});

var Lo = React.createClass({
    handleLogout: function (){
        base.unauth()

    },
    render: function() {
        return (
            <li><Link onClick={this.handleLogout} className="transBtn" to="/">LOG OUT</Link></li>
        );
    }
});

export default LogIn;