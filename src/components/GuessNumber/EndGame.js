import React from "react";
import Modal from "../UI/Modal";

import { useNavigate } from "react-router-dom";

import classes from "./EndGame.module.css"

const EndGame = (props)=>{
    const navigate = useNavigate();
    const restartMatchHandler =()=>{
        props.onRestart();
    }

    const exitMatchHandler = ()=>{  
        navigate('/')
    }
    return (
        <Modal>
            <div className={classes.endGame} >
                <div>
                    <h3>{props.status}</h3>
                    <h3>Score : {props.score}</h3>
                    <h3>attempts : {props.attempts}</h3>
                    <h3>correct guesses : {props.correctGuess}</h3>
                </div>
                <div>
                    <button onClick={restartMatchHandler} className={classes.btn}>Restart</button>
                    <button onClick={exitMatchHandler} className={classes.btn} style={{backgroundColor:'pink'}}>exit</button>
                </div>
            </div>
        </Modal>
    )
}

export default EndGame;