import React from 'react';

var Pushboxes = React.createClass({
    render: function(){
        var rows = [];
        var numrows = 1;
        for (var i=0; i < numrows; i++) {
            rows.push(<SkillBox key={i}  />);
        }
        return <div className="mainContainer">{rows}</div>;
    }

});

var Container = React.createClass({
    render: function(){
        return (
            <div className="container">
                <Header />
                <Main />
            </div>
        );
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
                    <li><a className="active" href="#home">Home</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
                <LogIn />
            </header>
        );
    }

});

var Main = React.createClass({
    getInitialState: function() {
        return {
            showUserProfile: true,
            showUserSkills: false

        };
    },
    onClickProfile: function() {
        this.setState({
            showUserProfile: true,
            showUserSkills: false
        });
    },
    onClickSkills: function() {
        this.setState({
            showUserSkills: true,
            showUserProfile: false
        });
    },
    onClickMessage: function() {
        this.setState({
            showUserMessage: true,
            showUserProfile: false,
            showUserSkills: false
        });
    },
    render: function(){
        return (
            <main className="main" >
                <div className="wrap-profiles">
                    <div className="profile-container">
                        <div className="profile-auth">
                            <div className="user-avatar"></div>
                            <div className="user-name-box">
                                <h4>Daniel Bernal Perez</h4>
                                <h5>Front-End Developer</h5>
                            </div>
                            <div className="user-social-media"></div>

                        </div>
                        <div className="profile-nav">
                            <ul className="user-nav">
                                <li><a href="#" onClick={this.onClickProfile}><i className="fa fa-user"></i></a></li>
                                <li><a href="#" onClick={this.onClickSkills}><i className="fa fa-diamond"></i></a></li>
                                <li><a href="#"><i className="fa fa-envelope-o"></i></a></li>
                                <li><a href="#"><i className="fa fa-comment"></i></a></li>
                            </ul>
                        </div>
                        { this.state.showUserProfile ? <UserProfile /> : null }
                        { this.state.showUserSkills ? <UserSkills /> : null }
                    </div>
                </div>
            </main>
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
        return {value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ultricies porttitor elementum. Morbi eu risus justo. Etiam molestie, urna vitae euismod hendrerit, velit nibh porttitor nulla, sit amet tristique magna neque sit amet leo.'};
    },
    handleChange: function(event){
        this.setState({value: event.target.value})
    },
    render: function(){
        return (
            <div className="profile-info">
                <p><strong>About Me</strong></p>
                <textarea
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
            </div>
        );
    }

});

var ref = new Firebase("https://commoni.firebaseio.com/");
//Entire NAV will be added through React use map to add the uls in right order
var LogIn = React.createClass ({

    handleLogin: function (){
        ref.authWithOAuthPopup("google", function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                }
                if (authData != null) {
                    console.log("Loged in");
                } else {
                    console.log("Not Loged in");
                }
            },
            {
                remember: "sessionOnly",
                scope: "email"
            });
    },
    handleLogout: function (){
        ref.unauth();
        console.log("Loged Out")

    },
    render : function(){
        return (
            <ul className="login">
                <li><a onClick={this.handleLogin} href="index.html" className="filledBtn">LOG IN</a></li>
                <li><a onClick={this.handleLogout} href="pages/login.html" className="transBtn">LOG OUT</a></li>
            </ul>
        );
    }

});

export default LogIn;
export default Container;


