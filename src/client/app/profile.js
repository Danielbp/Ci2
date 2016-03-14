import React from 'react';
import Rebase from 're-base';
var base = Rebase.createClass('https://commoni.firebaseio.com/');

var Profile = React.createClass({
    render: function(){
        return (
            <main className="main" >
                <div className="wrap-content">
                    <h1>Profile</h1>
                    <Main />
                </div>
            </main>
        );
    }

});

var Main = React.createClass({
    render: function(){
        return (
            <main className="main" >
                <div className="wrap-profiles">
                    <ProfileContainer />
                </div>
            </main>
        );
    }
});

var Username = React.createClass({
    getInitialState: function() {
        return {
            username: []
        };
    },
    componentWillMount: function() {
        // Two way data binding
        var authData = base.getAuth();
        var uid = authData.uid;
            this.ref = base.syncState('users/' + uid + '/username/', {
                context: this,
                state: 'username'
            });
    },
    componentWillUnmount(){
        base.removeBinding(this.ref);
    },
    onChange: function(b) {
        this.setState({username: b.target.value});
    },
    render: function(){
        return (
            <h4><input
                type="text"
                value={ this.state.username }
                onChange={ this.onChange }
            /></h4>
        );
    }
});

var Profession = React.createClass({
    getInitialState: function() {
        return {
            profession: []
        };
    },
    componentWillMount: function() {
        // Two way data binding
        var authData = base.getAuth();
        var uid = authData.uid;
            this.ref2 = base.syncState('users/' + uid + '/profession/', {
                context: this,
                state: 'profession'
            });
    },
    componentWillUnmount(){
        base.removeBinding(this.ref2)
    },
    onChange2: function(d) {
        this.setState({profession: d.target.value});
    },
    render: function(){
        return (
            <h5><input
                type="text"
                value={ this.state.profession }
                onChange={ this.onChange2 }
            /></h5>
        );
    }
});

var ProfileContainer = React.createClass({
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

            <div className="profile-container">
                <div className="profile-auth">
                    <div className="user-avatar"></div>
                    <div className="user-name-box">
                        <Username />
                        <Profession />
                    </div>
                    <div className="user-social-media"></div>

                </div>
                <div className="profile-nav">
                    <ul className="user-nav">
                        <li><a onClick={this.onClickProfile}><i className="fa fa-user"></i></a></li>
                        <li><a onClick={this.onClickSkills}><i className="fa fa-diamond"></i></a></li>
                        <li><a onClick={this.onClickMessage}><i className="fa fa-envelope-o"></i></a></li>
                        <li><a><i className="fa fa-comment"></i></a></li>
                    </ul>
                </div>
                { this.state.showUserProfile ? <UserProfile /> : null }
                { this.state.showUserSkills ? <UserSkills2 /> : null }
                { this.state.showUserComments ? <CommentBox /> : null }
            </div>
        );
    }

});

var firebaseUrl = "https://commoni.firebaseio.com/users";

var CommentBox = React.createClass({
    mixins: [ReactFireMixin],

    handleCommentSubmit: function(comment) {
        // Here we push the update out to Firebase and let ReactFire update this.state.data
        this.firebaseRefs["data"].push(comment);
    },

    getInitialState: function() {
        return {
            data: []
        };
    },

    componentWillMount: function() {
        // Here we bind the component to Firebase and it handles all data updates,
        // no need to poll as in the React example.

        var authData = base.getAuth();
        var uid = authData.uid;
        this.bindAsArray(new Firebase(firebaseUrl + '/'  + uid + '/' + "commentBox"), "data");
    },

    render: function() {
        return (
            <div className="messageBox">
                <p><strong>Message</strong></p>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }

});

var converter = new Showdown.converter();


var Comment = React.createClass({
    render: function() {
        var rawMarkup = converter.makeHtml(this.props.children.toString());
        return (
            <div className="message">
                <p className="messageAuthor">{this.props.author}</p>
                <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
            </div>
        );
    }
});


var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function (comment, index) {
            return <Comment key={index} author={comment.author}>{comment.text}</Comment>;
        });
        return <div className="messageList">{commentNodes}</div>;
    }
});


var CommentForm = React.createClass({
    handleSubmit: function() {
        var author = this.refs.author.getDOMNode().value.trim();
        var text = this.refs.text.getDOMNode().value.trim();
        this.props.onCommentSubmit({author: author, text: text});
        this.refs.author.getDOMNode().value = '';
        this.refs.text.getDOMNode().value = '';
        return false;
    },

    render: function() {
        return (
            <form className="messageForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name" ref="author" />
                <input type="text" placeholder="Say something..." ref="text" />
                <input type="submit" value="Post" />
            </form>
        );
    }
});

var UserSkills = React.createClass({
    getInitialState: function(){
        return {
            inputs : [],
            remove: "visible removeSkill",
            edit: "visible"
        };
    },
    addInputField: function(e) {
        e.preventDefault();

        var inputs = this.state.inputs;
        inputs.push({name: null});
        this.setState({inputs : inputs});
    },
    removeInputField: function(index) {
        var inputs = this.state.inputs;
        inputs.splice(index, 1);
        this.setState({inputs : inputs});
    },
    handleSubmit: function (e) {
        e.preventDefault();
        // What do I do here?
    },
    editSkills: function () {
        if (this.state.edit === "visible" && this.state.remove === "visible removeSkill"){
            this.setState({edit: "hidden"});
            this.setState({remove: "hidden removeSkill"});
        } else {
            this.setState({edit: "visible"});
            this.setState({remove: "visible removeSkill"});
        }
    },
    render: function(){
        var inputs = this.state.inputs;
        return (
            <div className="profile-info">
                <p><strong>My Skills</strong></p>
                <span onClick={this.editSkills} onClick={this.editSkills}><i className="fa fa-pencil"></i></span>
                <span className={this.state.edit} onClick={this.addInputField}><i className="fa fa-plus"></i></span>
                {inputs.map(function (input, index) {
                    var ref = "input_" + index;
                    return (
                        <div className="progressBar" key={index}>
                            <div className="progressBarContainer">
                                <div className="progressBarValue value-90 pbb">
                                    <input type="text" placeholder="Enter Skill" value={input.name} ref={ref} aria-describedby={ref}/>
                                    <span className={this.state.remove} onClick={this.removeInputField.bind(this, index)} id={ref} ><i className="fa fa-times"></i></span>
                                </div>
                            </div>
                        </div>
                    )
                }.bind(this))}
                <div className="progressBar">
                    <div className="progressBarContainer">
                        <div className="progressBarValue value-90 pbb">HTML5</div>
                    </div>
                </div>
                <div className="progressBar">
                    <div className="progressBarContainer">
                        <div className="progressBarValue value-80 pby">CSS3</div>
                    </div>
                </div>
                <div className="progressBar">
                    <div className="progressBarContainer">
                        <div className="progressBarValue value-30 pbg">Javascript</div>
                    </div>
                </div>
                <div className="progressBar">
                    <div className="progressBarContainer">
                        <div className="progressBarValue value-70 pbr">WordPress</div>
                    </div>
                </div>
            </div>
        );
    }
});

var UserProfile = React.createClass({
    getInitialState: function(){
        return {
            about: []
        };
    },
    componentWillMount: function() {
        // Two way data binding
        var authData = base.getAuth();
        var uid = authData.uid;
            this.ref = base.syncState('users/' + uid + '/about/', {
                context: this,
                state: 'about'
            });
    },
    componentWillUnmount(){
        base.removeBinding(this.ref);
    },
    onChange: function(e) {
        this.setState({about: e.target.value});
    },
    render: function(){
        return (
            <div className="profile-info">
                <p><strong>About Me</strong></p>

             <textarea
                 type="text"
                 value={ this.state.about }
                 onChange={ this.onChange }
             />
            </div>
        );
    }

});



var SkillsList = React.createClass({
    render: function() {
        var _this = this;
        var createItem = function(item, index) {
            return (
                <li key={ index }>
                    { item.text }
          <span onClick={ _this.props.removeItem.bind(null, item['.key']) }
                style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }}>
            <i className="fa fa-times"></i>
          </span>
                </li>
            );
        };
        return <ul>{ this.props.items.map(createItem) }</ul>;
    }
});

//Removed for now not working as intended
//this.firebaseRef = new Firebase(ref + "users/" + authData.uid +"/items/");

var UserSkills2 = React.createClass({
    mixins: [ReactFireMixin],
    componentWillMount: function() {
        var ref = new Firebase("https://commoni.firebaseio.com/");
        var authData = ref.getAuth();
        this.firebaseRef = new Firebase(ref + 'users/' + authData.uid + '/items/');
        this.firebaseRef.limitToLast(25).on('value', function(dataSnapshot) {
            var items = [];
            dataSnapshot.forEach(function(childSnapshot) {
                var item = childSnapshot.val();
                item['.key'] = childSnapshot.key();
                items.push(item);
            }.bind(this));

            this.setState({
                items: items
            });
        }.bind(this));
    },
    componentWillUnmount: function() {
        this.firebaseRef.off();
    },
    getInitialState: function() {
        return {
            items: [],
            text: ''
        };
    },
    onChange: function(e) {
        this.setState({text: e.target.value});
    },
    removeItem: function(key) {
        var ref = new Firebase("https://commoni.firebaseio.com/");
        var authData = ref.getAuth();
        var firebaseRef = new Firebase(ref + 'users/' + authData.uid + '/items/');
        firebaseRef.child(key).remove();
    },

    handleSubmit: function(e) {
        e.preventDefault();
        if (this.state.text && this.state.text.trim().length !== 0) {
            this.firebaseRef.push({
                text: this.state.text
            });
            this.setState({
                text: ''
            });
        }
    },
    render: function() {
        return (
            <div className="profile-info">
                <p><strong>My Skills</strong></p>
                <SkillsList items={ this.state.items } removeItem={ this.removeItem } />
                <form onSubmit={ this.handleSubmit }>
                    <input placeholder="Add Skill" onChange={ this.onChange } value={ this.state.text } />
                    <button><i className="fa fa-plus"></i></button>
                </form>
            </div>
        );
    }
});

export default Profile;


/*
 var UserProfile = React.createClass({
 mixins: [ReactFireMixin],
 getInitialState: function(){
 return {about: ''};
 },
 componentWillMount: function() {
 var ref = new Firebase("https://commoni.firebaseio.com/");
 var authData = ref.getAuth();
 var firebaseRef = new Firebase( ref + "users/" + authData.uid + "/");
 this.bindAsArray(firebaseRef.limitToLast(25), 'users');
 },
 onChange: function(e) {
 this.setState({about: e.target.value});
 },
 handleChange: function(e){
 e.preventDefault();
 if (this.state.about && this.state.about.trim().length !== 0) {
 this.firebaseRefs['users'].update({
 about: this.state.about
 });
 }
 },
 render: function(){
 return (
 <div className="profile-info">
 <p><strong>About Me</strong></p>
 <p>{ this.state.about }</p>
 <textarea
 type="text"
 value={ this.state.about }
 onChange={ this.onChange }
 />
 <span onClick={ this.handleChange }><i className="fa fa-cloud"></i></span>
 </div>
 );
 }

 });
 */

/*Original
 var UserProfile = React.createClass({
 mixins: [ReactFireMixin],
 getInitialState: function(){
 return {about: ''};
 },
 onChange: function(e) {
 this.setState({about: e.target.value});
 },
 render: function(){
 return (
 <div className="profile-info">
 <p><strong>About Me</strong></p>
 <textarea
 type="text"
 value={ this.state.about }
 onChange={ this.onChange }
 />
 </div>
 );
 }

 });
 */