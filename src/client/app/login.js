import React from 'react';
import { Link } from 'react-router';

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
            <ul className="login" onClick={this.onLogin}>
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

var Li = React.createClass({
    handleLogin: function (){
        var isNewUser = true;
        var ref = new Firebase("https://commoni.firebaseio.com/");
        ref.authWithOAuthPopup("google", function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else if(authData) {
                console.log("Logged in as", authData );
                user.name = authData.google.displayName;
                //Find out how to display this information in other components
                console.log("Welcome " + user.name);
            }
        });
        ref.onAuth(function(authData) {
            if (authData && isNewUser) {
                // save the user's profile into the database so we can list users,
                // use them in Security and Firebase Rules, and show profiles
                ref.child("users").child(authData.uid).set({
                    provider: authData.provider,
                    name: getName(authData)
                });
            }
        });
        function getName(authData) {
            switch(authData.provider) {
                case 'password':
                    return authData.password.email.replace(/@.*/, '');
                case 'google':
                    return authData.google.displayName;
            }
        }
    },
    render: function() {
        return (

                <li><Link onClick={this.handleLogin} className="filledBtn" to="/profile">SIGN IN</Link></li>

        );
    }
});

var Lo = React.createClass({
    handleLogout: function (){
        var ref = new Firebase("https://commoni.firebaseio.com/");
        ref.unauth();
        console.log("Logged Out");

    },
    render: function() {
        return (
            <li><Link onClick={this.handleLogout} className="transBtn" to="/">LOG OUT</Link></li>
        );
    }
});

export default LogIn;