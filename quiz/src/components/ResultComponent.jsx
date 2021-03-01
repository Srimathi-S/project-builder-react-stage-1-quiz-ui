import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./resultComponent.css"
class ResultComponent extends Component {
    constructor(props)
    {
        super(props)
    }
    totalAnswered(answerScoreArray)
    {
        return answerScoreArray.length;
    }
    totalCorrect(answerScoreArray)
    {
        let correct=answerScoreArray.filter((points)=>points==5);
        return correct.length;
    }
    totalScorePercentage(totalCorrect,totalQuestion)
    {
        return (totalCorrect/totalQuestion)*100;
    }
    render() {
        let totalQuestion=this.props.totalQuestion;
        let totalAnswered=this.totalAnswered(this.props.pointsForSelectedAnswers);
        let totalCorrect=this.totalCorrect(this.props.pointsForSelectedAnswers);
        let totalWrong=totalAnswered-totalCorrect;
        let totalScorePercentage=this.totalScorePercentage(totalCorrect,totalQuestion);
        return (
            <div className="result">
                <h2>Result</h2>
                <h3>Your score is {totalScorePercentage}%</h3>
                <div className="result-data">
                    <p>Total Questions</p>
                    <p>{totalQuestion}</p>
                </div>
                <div className="result-data">
                    <p>Total Answered</p>
                    <p>{totalAnswered}</p>
                </div>
                <div className="result-data">
                    <p>Total Right Answer</p>
                    <p>{totalCorrect}</p>
                </div>
                <div className="result-data">
                    <p>Total Wrong answer</p>
                    <p>{totalWrong}</p>
                </div>
                <div className="navigation">
                <Link to='/'><button id="home" onClick={()=>this.props.endQuiz()}>Home</button></Link>
                <Link to='/quiz'><button id="play-again" onClick={()=>this.props.endQuiz()}>Play again</button></Link>
                </div>
            </div>
        );
    }
}

export default ResultComponent;