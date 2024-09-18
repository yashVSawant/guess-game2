import React from "react";
import classes from './Feedback.module.css'

const Feedback = (props)=>{
    const feedback = props.feedback;
    let message = "";
    let btnText = "ok";
    let background = 'rgb(243, 220, 176)'
    if(feedback === 'match'){
        message = "Congratulations you guessed it right!";
        btnText = "thanks!"
        background = "rgb(190, 248, 167)"
    }
    else if(feedback === 'high'){
        message = "your guess is higher!"; 
    }
    else if(feedback === 'low'){
        message = "your guess is lower!";
    }

    const btnClickHandler = ()=>{
        props.onClick();
    }

    
    return (<div>
        {message}
        <button onClick={btnClickHandler} className={classes.btn} style={{backgroundColor: background}} >{btnText}</button>
    </div>)
}

export default Feedback;