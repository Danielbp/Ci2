import React from 'react'

var About = React.createClass({
    render: function(){
        return (
            <div className="container">

                <header className="main-header">
                    <a className="site-logo" href="#logo">
                        <img src="" alt=""></img>
                    </a>
                    <ul className="nav">
                        <li><a className="active" href="#home">Home</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="#about">About</a></li>
                    </ul>
                    <ul className="login">
                        <li><a href="#" className="transBtn">SIGN UP</a></li>
                        <li><a href="../index.html" className="filledBtn">LOG IN</a></li>
                    </ul>
                </header>

                <main className="main" >
                    <div className="wrap-content">
                        <h1>Contact</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean facilisis mi arcu, non cursus lacus cursus congue. Quisque molestie porttitor turpis, ac lobortis purus. Sed eget nisl porta ante tincidunt consectetur ut et quam. Aenean ultricies tempus ligula sagittis iaculis. Suspendisse ultrices fringilla facilisis. Praesent euismod porta suscipit. Ut varius massa non tortor euismod, vitae egestas neque vulputate.

                        </p>
                    </div>
                </main>

                <footer className="footer"></footer>
            </div>
        );
    }

});

export default About;