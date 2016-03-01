import React from 'react';
import { Link } from 'react-router';
import Header from './main';

var Landing = React.createClass({
    render: function(){
        return (
                <main className="main" >
                    <div className="wrap-content">
                        <h1>Common interest finder</h1>
                        <p>A way to find friends and like-minded people with emia, chatt or Meetups</p>
                        <ul className="info">
                            <li><Link className="transBtn" to="/about">Learn More</Link></li>
                            <li><Link className="filledBtn" to="/about">Continue</Link></li>
                        </ul>
                    </div>
                </main>
        );
    }

});

export default Landing;