import React from "react";

const PastScore = (props)=>{
    const {score ,attemptsMade ,correctGuesses} = props.score;
    return (<li>
        <p>Score : {score} </p>
        <p>Attempts : {attemptsMade} </p>
        <p>Corect Guesses : {correctGuesses} </p>
    </li>)
}

export default PastScore;