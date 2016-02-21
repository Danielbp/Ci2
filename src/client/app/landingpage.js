import React from 'react';
import {render} from 'react-dom';

var Landing = React.createClass({
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
                        <h1>Common interest finder</h1>
                        <p>A way to find friends and like-minded people with emia, chatt or Meetups</p>
                        <ul className="info">
                            <li><a href="#" className="transBtn">Learn More</a></li>
                            <li><a href="#" className="filledBtn">Continue</a></li>
                        </ul>
                    </div>
                </main>

                <footer className="footer"></footer>
            </div>
        );
    }

});

render(

    <Landing />,
    document.getElementById('landing')


);