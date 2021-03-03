import React, { Component } from 'react';

class CountdownComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            timeLeft:100,
            currentQuestion:this.props.currentQuestion
        }
    }
    componentDidMount()
    {
        this.setState({timeLeft:100})
        this.interval=setInterval(()=>{
            if(this.state.timeLeft==0){
                this.state.timeLeft=10;
                this.props.countdownEnded();
                clearInterval(this.interval);
              return;
            }
            this.setState((previous)=>{return {timeLeft:previous.timeLeft-1}});
            console.log("here");
            return;
        },1000);
    }
    componentWillUnmount()
    {
        this.setState({timeLeft:100});
        clearInterval(this.interval);
    }
    changeQuestionAndResetTimer()
    {
        this.setState({
            timeLeft:100,
            currentQuestion:this.props.currentQuestion
        })
    }
    render() {
       if(this.props.currentQuestion!=this.state.currentQuestion)this.changeQuestionAndResetTimer()
        return (
            <div>
                <p>TimeLeft :{this.state.timeLeft}</p>
            </div>
        );
    }
}

export default CountdownComponent;