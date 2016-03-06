import React from 'react';
import { Link, Router, browserHistory,hashHistory } from 'react-router';
import Rebase from 're-base';
var base = Rebase.createClass('https://commoni.firebaseio.com/');

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
        var uid = null;
        e.preventDefault();
        base.authWithOAuthPopup('google', function(err, user) {
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
                        about: 'About you',
                        profession: 'Your profession',
                        username: 'Your Name'
                    }
                });
                hashHistory.push('/profile')
            } else {
                // logged out
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


export default LogIn;