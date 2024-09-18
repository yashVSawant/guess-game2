import React from "react";

import classes from "./Player.module.css"

const Player = (props)=>{
    return (<li className={classes.player}>
        <p>{props.name}</p> <p>{props.score}</p>
    </li>)
}

export default Player;