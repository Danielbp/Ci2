import React from 'react';
import { Link } from 'react-router';

var user = {
    name: ''
};

//Entire NAV will be added through React use map to add the uls in right order
var LogIn = React.createClass ({
    logIn: function (){

    },
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
        var authData = ref.getAuth();
        if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
        } else {
            console.log("User is logged out");
        }
    },
    handleLogout: function (){
        var ref = new Firebase("https://commoni.firebaseio.com/");
        ref.unauth();
        console.log("Logged Out");

    },
    render : function(){
        return (
            <ul className="login">
                <li><Link onClick={this.handleLogin} className="filledBtn" to="/profile">SIGN IN</Link></li>
                <li><Link onClick={this.getInitialState} className="transBtn" to="/">LOG OUT</Link></li>
            </ul>
        );
    }

});

export default LogIn;