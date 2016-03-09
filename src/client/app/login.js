import React from 'react';
import { Link, Router, browserHistory,hashHistory } from 'react-router';
import Rebase from 're-base';
var base = Rebase.createClass('https://commoni.firebaseio.com/');
var authData = base.getAuth();

//FIND OUT HOW TO PASS VALUES FROM OTHER COMPONENTS

var LogIn = React.createClass ({
    getInitialState: function() {
        return {
            login: true,
            logout: false
        };
    },
    onLogin: function() {
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



var Li = React.createClass({
    getInitialState: function(){
        return {

        }
    },
    handleLogin: function (e){
        e.preventDefault();

        var uid = null;
        var test = null;
        base.authWithOAuthPopup('google', function(err, user) {

            go();

            function go() {
                var userId = user.uid;
                var userData = {
                    name: user.google.displayName,
                    provider: user.provider,
                    uid: uid,
                    username: 'name',
                    profession: 'profession',
                    about: 'about you'
                };
                tryCreateUser(userId,userData);
            }

            var USERS_LOCATION = 'https://commoni.firebaseio.com/';

            function userCreated(userId, success) {
                if (!success) {
                    console.log('user ' + userId + ' already exists!');
                    hashHistory.push('/profile')
                } else {
                    console.log('Successfully created ' + userId);
                    if (err) {
                        console.log(err, 'error');
                    } else if (user) {
                        // logged in!
                        uid = user.uid;
                        console.log('logged in with id', uid);
                        base.post('users/' + uid, {
                            data: {
                                name: user.google.displayName,
                                provider: user.provider,
                                uid: uid,
                                username: 'name',
                                profession: 'profession',
                                about: 'about you'
                            },
                            then(){
                                hashHistory.push('/profile')
                            }
                        });
                    }else {
                        hashHistory.push('/');
                    }
                }
            }

// Tries to set /users/<userId> to the specified data, but only
// if there's no data there already.
            function tryCreateUser(userId, userData) {
                var usersRef = new Firebase('https://commoni.firebaseio.com/users');
                usersRef.child(userId).transaction(function(currentUserData) {
                    if (currentUserData === null)
                        return userData;
                }, function(error, committed) {
                    userCreated(userData, committed);
                });
            }
        });
    },
    render: function() {
        return (

            <li><Link onClick={this.handleLogin} className="filledBtn" to="/profile" >SIGN IN</Link></li>

        );
    }
});

var Lo = React.createClass({
    handleLogout: function (e){
        e.preventDefault();
        base.unauth();
        hashHistory.push('/')
    },
    render: function() {
        return (
            <li><Link onClick={this.handleLogout} className="transBtn" to="/">LOG OUT</Link></li>
        );
    }
});


function authDataCallback(authData) {
    if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
    } else {
        console.log("User is logged out");
    }
}

var ref = new Firebase("https://commoni.firebaseio.com/");
ref.onAuth(authDataCallback);


export default LogIn;