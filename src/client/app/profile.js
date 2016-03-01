import React from 'react'

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

var ProfileContainer = React.createClass({
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

            <div className="profile-container">
                <div className="profile-auth">
                    <div className="user-avatar"></div>
                    <div className="user-name-box">
                        <h4></h4>
                        <h5>Front-End Developer</h5>
                    </div>
                    <div className="user-social-media"></div>

                </div>
                <div className="profile-nav">
                    <ul className="user-nav">
                        <li><a onClick={this.onClickProfile}><i className="fa fa-user"></i></a></li>
                        <li><a onClick={this.onClickSkills}><i className="fa fa-diamond"></i></a></li>
                        <li><a><i className="fa fa-envelope-o"></i></a></li>
                        <li><a><i className="fa fa-comment"></i></a></li>
                    </ul>
                </div>
                { this.state.showUserProfile ? <UserProfile /> : null }
                { this.state.showUserSkills ? <UserSkills /> : null }
            </div>
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

export default Profile;