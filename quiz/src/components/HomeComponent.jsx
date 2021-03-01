import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import QuizComponent from './QuizComponent';

class HomeComponent extends Component {
    constructor()
    {
        super();
    }
    render() {
        
        return (
            <div id="home-div">
                <h1>Quiz</h1>
                <Link to="/quiz"><button id="play-button">Play</button></Link>
            </div>
        );
    }
}

export default HomeComponent;