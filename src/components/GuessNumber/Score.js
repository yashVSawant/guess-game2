import React from "react";
import classes from './Score.module.css'

const Score = (props)=>{
    const scoreWidth =( props.score / props.highest) * 100;
    if(props.score >= props.highest && props.score !== 0){
        return (
            <div className={classes.scoreBar}>
                Congratulations! your new highest score is {props.score}
            </div>
        )
    }
    return (
        <div className={classes.scoreBar}>
            Score ({props.score})
            <div className={classes.outer}>
                <div className={classes.inner} style={{width:`${scoreWidth}%`}}></div>
            </div>Highest score({props.highest})
        </div>
    )
}

export default Score;