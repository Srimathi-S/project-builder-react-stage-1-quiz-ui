import { Component } from "react";
import './App.css';
import HomeComponent from "./components/HomeComponent";
import ResultComponent from "./components/ResultComponent";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import QuizComponent from "./components/QuizComponent";
import axios from 'axios';
class App extends Component{
  constructor()
  {
  super()
  this.state={
    pointsForSelectedAnswers:[],
    currentQuestion:0,
    isCurrentQuestion:false,
    quizQuestion:[],
    totalQuestion:0
  }
  }
  componentDidMount=()=>{
    axios.get('https://my-json-server.typicode.com/Naveen132895/quiz-api/questions')
    .then((response)=>{
      this.setState({
        quizQuestion:response.data,
        totalQuestion:response.data.length
      })
    }).catch((error)=>console.log(error));
  }
  onNextButtonClick=(selectedAnswer)=>{
    if(this.state.currentQuestion>this.state.totalQuestion)return;
   const modifiedPointsArray=this.state.pointsForSelectedAnswers;
   if(selectedAnswer!='' && selectedAnswer==this.state.quizQuestion[this.state.currentQuestion].answer)modifiedPointsArray.push(5);
   else modifiedPointsArray.push(0);
   this.setState((previous)=>{
     return {pointsForSelectedAnswers:modifiedPointsArray,
            currentQuestion:previous.currentQuestion+1,
            isCurrentQuestion:false};
   });
  }
  onPreviousButtonClick=()=>{
    if(this.state.currentQuestion==0)
    {
      alert("No previous questions");
      return;
    }
    const modifiedPointsArray=this.state.pointsForSelectedAnswers;
    if(modifiedPointsArray!=undefined)modifiedPointsArray.pop();
    this.setState((previous)=>{
     return {pointsForSelectedAnswers:modifiedPointsArray,
            currentQuestion:previous.currentQuestion-1,
            isCurrentQuestion:false};
   });
  }
  isAnswerRight=(selectedAnswer)=>{
    if(this.state.isCurrentQuestion==false)return "";
    if(this.state.quizQuestion[this.state.currentQuestion].answer===selectedAnswer)return "Right answer";
    return "Wrong answer";
  }
  setIsCurrentQuestionTrue()
  {
    this.state.isCurrentQuestion=true;
  }
  endQuiz=()=>{
    this.setState( {pointsForSelectedAnswers:[],
      currentQuestion:0});
  }
  render()
  {
  return (
    <div className="App">
      <Router>
       <Switch>
         <Route exact path="/"><HomeComponent/></Route>
         <Route path="/quiz"><QuizComponent onNextButtonClick={(selectedAnswer)=>this.onNextButtonClick(selectedAnswer)} onPreviousButtonClick={()=>this.onPreviousButtonClick()} currentQuestion={this.state.currentQuestion} isAnswerRight={(selectedAnswer)=>this.isAnswerRight(selectedAnswer)} setIsCurrentQuestionTrue={()=>this.setIsCurrentQuestionTrue()} quizQuestion={this.state.quizQuestion}/></Route>
         <Route path="/totalScore"><ResultComponent endQuiz={()=>this.endQuiz()} totalQuestion={this.state.totalQuestion} pointsForSelectedAnswers={this.state.pointsForSelectedAnswers}/></Route>
       </Switch>
      </Router>
    </div>
  );
  }
}

export default App;
