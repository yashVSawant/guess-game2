import React from "react";

import PastScore from "./PastScore";

import classes from "./PastScores.module.css"

const PastScores = (props)=>{
    return (
        <div>
            <p>Past Scores:</p>
            <ul className={classes.scores} >
                {props.scores.map((s)=>{return <PastScore key={s._id} score={s}/>})}
            </ul>
        </div>
    )
}

export default PastScores