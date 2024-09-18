import React from "react";

import PastScores from "./PastScores";

import classes from "./Profile.module.css"

const Profile = (props)=>{
    return (
        <div className={classes.profile}>
        <div className={classes.name}>
            <h1>{props.name}</h1>
        </div>
        <hr></hr>
        <p className={classes.stats}>Highest Score : {props.highestScore}</p>
        <p className={classes.stats}>TotalScore : {props.totalScore}</p>
        <p className={classes.stats}>Matches : {props.matches}</p>
        <hr></hr>
        <PastScores scores={props.scores}/>
    </div>
    )
}

export default Profile;