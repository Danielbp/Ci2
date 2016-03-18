import React from 'react'
import Rebase from 're-base';
import addons from 'react-addons-create-fragment';
var createFragment = require('react-addons-create-fragment');
var base = Rebase.createClass('https://commoni.firebaseio.com/');


var Search = React.createClass({
    render: function(){
        return (
            <main className="main" >
                <h1>Profiles list</h1>
                <SearchBox />
            </main>
        );
    }

});

var SearchBox = React.createClass({
    mixins: [ReactFireMixin],
    getInitialState: function() {
        return {
            users: [],
            showUserProfile: true,
            showUserSkills: false,
            showUserComments: false

        };
    },
    componentWillMount: function() {
        var ref = new Firebase('https://commoni.firebaseio.com/users');
        this.bindAsArray(ref, "users");


    },
    render:function() {
        var users = this.state.users.map(function (users, i) {
            return (
                <div className="profile-container" obj={users['.key'] }  key={i} >
                    <div className="profile-auth">
                        <div className="user-avatar"></div>
                        <div className="user-name-box">
                            <h4>{users.username}</h4>
                            <h5>{users.profession}</h5>
                        </div>
                        <div className="user-social-media"></div>
                    </div>
                    <UserNav  about={users.about} skills={users} />
                </div>
            );
        }.bind(this));
        return <div className="wrap-profiles">{users}</div>
    }

});

/*
 <div className="profile-nav">
 <ul className="user-nav">
 <li><a onClick={this.onClickProfile}><i className="fa fa-user"></i></a></li>
 <li><a onClick={this.onClickSkills}><i className="fa fa-diamond"></i></a></li>
 <li><a onClick={this.onClickMessage}><i className="fa fa-envelope-o"></i></a></li>
 <li><a ><i className="fa fa-comment"></i></a></li>
 </ul>
 </div>
 */



var UserNav = React.createClass({
    getInitialState: function() {
        return {
            showUserProfile: true,
            showUserSkills: false,
            showUserComments: false

        };
    },
    onClickProfile: function() {
        this.setState({
            showUserProfile: true,
            showUserSkills: false,
            showUserComments: false
        });
    },
    onClickSkills: function() {
        this.setState({
            showUserSkills: true,
            showUserProfile: false,
            showUserComments: false
        });
    },
    onClickMessage: function() {
        this.setState({
            showUserComments: true,
            showUserProfile: false,
            showUserSkills: false
        });
    },
    render: function(){
        return (
            <div>
                <div className="profile-nav">
                    <ul className="user-nav">
                        <li><a onClick={this.onClickProfile}><i className="fa fa-user"></i></a></li>
                        <li><a onClick={this.onClickSkills}><i className="fa fa-diamond"></i></a></li>
                        <li><a onClick={this.onClickMessage}><i className="fa fa-envelope-o"></i></a></li>
                        <li><a><i className="fa fa-comment"></i></a></li>
                    </ul>
                </div>
                { this.state.showUserProfile ? <UserProfile about={this.props.about} />: null }
                { this.state.showUserSkills ? <UserSkills2 skills={this.props.skills} /> : null }
                { this.state.showUserComments ? <CommentBox /> : null }
            </div>
        );
    }
});

var UserProfile = React.createClass({
    mixins: [ReactFireMixin],
    getInitialState: function() {
        return {
            users: []
        };
    },
    componentWillMount: function() {
        var ref = new Firebase('https://commoni.firebaseio.com/users');
        this.bindAsArray(ref, "users");

    },
    render: function(){
        return (
            <div className="profile-info">
                <p><strong>About Me</strong></p>
                <p>{this.props.about}</p>
            </div>
        );
    }
});

var CommentBox = React.createClass({
    render: function() {
        return (
            <div className="messageBox">
                <p><strong>Message</strong></p>

            </div>
        );
    }

});

var UserSkills2 = React.createClass({
    render: function() {
        var test = this.props.skills.items;
        var pairs = [];
        for(var key in test){
            pairs.push(<li key={key}>{addons(test[key])}</li>);
        }
        return (
            <div className="profile-info">
                <p><strong>My Skills</strong></p>
                <ul>{pairs}</ul>
            </div>
        );
    }

});

export default Search;