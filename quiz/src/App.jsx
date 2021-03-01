import { Component } from "react";
import './App.css';
import HomeComponent from "./components/HomeComponent";
import ResultComponent from "./components/ResultComponent";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import QuizComponent from "./components/QuizComponent";
import quiz from "./components/quiz.json";
class App extends Component{
  constructor()
  {
  super()
  this.quizQuestion=[...quiz];
  this.state={
    pointsForSelectedAnswers:[],
    currentQuestion:0
  }
  }
  onNextButtonClick=(selectedAnswer)=>{
   const modifiedPointsArray=this.state.pointsForSelectedAnswers;
   console.log(this.quizQuestion[this.state.currentQuestion].selectedOption);
   if(selectedAnswer==this.quizQuestion[this.state.currentQuestion].answer)modifiedPointsArray.push(5);
   else modifiedPointsArray.push(0);
   this.setState((previous)=>{
     console.log(previous.currentQuestion);
     return {pointsForSelectedAnswers:modifiedPointsArray,
            currentQuestion:previous.currentQuestion+1};
   });
   console.log(this.state);
  }
  onPreviousButtonClick=()=>{
    if(this.state.currentQuestion==0)
    {
      alert("No previous questions");
      return;
    }
    const modifiedPointsArray=this.state.pointsForSelectedAnswers;
    console.log(this.quizQuestion[this.state.currentQuestion].selectedOption);
    if(modifiedPointsArray!=undefined)modifiedPointsArray.pop();
    this.setState((previous)=>{
     console.log(previous.currentQuestion);
     return {pointsForSelectedAnswers:modifiedPointsArray,
            currentQuestion:previous.currentQuestion-1};
   });
  }
  render()
  {
  console.log("Calling this render on app");
  return (
    <div className="App">
      <Router>
       <Switch>
         <Route exact path="/"><HomeComponent/></Route>
         <Route path="/quiz"><QuizComponent onNextButtonClick={(selectedAnswer)=>this.onNextButtonClick(selectedAnswer)} onPreviousButtonClick={()=>this.onPreviousButtonClick()} currentQuestion={this.state.currentQuestion}/></Route>
         <Route path="/totalScore"><ResultComponent totalQuestion={this.quizQuestion.length} pointsForSelectedAnswers={this.state.pointsForSelectedAnswers}/></Route>
       </Switch>
      </Router>
    </div>
  );
  }
}

export default App;
