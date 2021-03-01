import React, { Component } from 'react';
import quiz from "./quiz.json";
import "./quizComponent.css";
import {Link, Redirect} from "react-router-dom";
class QuizComponent extends Component {
    constructor(props)
    {
        super(props);
        this.quizQuestion=[...quiz];
        this.state={
            clickedOption:"",
            selectedAnswer:""
        };
    }
    setClicked(event)
    {
        let selectedElementId=event.target.id;
        let selectedAnswer=event.target.innerHTML;
        this.props.setIsCurrentQuestionTrue();
        this.setState({
            clickedOption:selectedElementId,
            selectedAnswer:selectedAnswer
        })
    }
    render() {
        let currentQuestion=this.props.currentQuestion;
        if(currentQuestion>=this.quizQuestion.length)return <Redirect to='/totalScore'/>
        return (
            <div id="question-palette">
                <h1>Question</h1>
                {this.props.isAnswerRight(this.state.selectedAnswer)}
                
                <React.Fragment key={currentQuestion}>
                    <p>{this.quizQuestion[currentQuestion].question}</p>
                    <div id="first-row">
                        <button id="optionA" className="options" onClick={this.setClicked.bind(this)}>{this.quizQuestion[currentQuestion].optionA}</button>
                        <button id="optionB"className="options" onClick={this.setClicked.bind(this)}>{this.quizQuestion[currentQuestion].optionB}</button>
                    </div>
                    <div id="second-row">
                        <button id="optionC" className="options" onClick={this.setClicked.bind(this)}>{this.quizQuestion[currentQuestion].optionC}</button>
                        <button id="optionD" className="options" onClick={this.setClicked.bind(this)}>{this.quizQuestion[currentQuestion].optionD}</button>
                    </div>
                    <div id="navigation-buttons">
                    <button className="next" onClick={this.props.onNextButtonClick.bind(this.props,this.state.selectedAnswer)}>Next</button>
                    <button className="previous" onClick={this.props.onPreviousButtonClick.bind(this)}>Previous</button>
                    <Link to='/totalScore'><button className="quit" onClick={this.props.onNextButtonClick.bind(this.props,this.state.selectedAnswer)}>Quit</button></Link>
                    </div>
                </React.Fragment>
            </div>
        );
    }
}

export default QuizComponent;