import React, { useState } from 'react';
import { useSearchParams , useParams } from 'react-router-dom';

import Headers from '../Layout/Headers';
import EndGame from './EndGame';
import Score from './Score';
import Feedback from './Feedback';
import useApi from '../../service/api';
import classes from "./GuessNumber.module.css"


const GuessNumber = ()=> {
  const api = useApi();
  const {id} = useParams('id');
  const [searchParams] = useSearchParams();
  const startingAttempts = searchParams.get('totalAttempts');
  const highestScore = searchParams.get('highestScore');
  const firstHint = searchParams.get('hint');
  
  const [gameId ,setGameId] = useState(id)
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [hint , setHint] =useState(firstHint);
  const [correctGuess ,setCorrectGuess] =useState(0);
  const [totalAttempts, setTotalAttempts] = useState(startingAttempts);
  const [score, setScore] = useState(0);
  const [target ,setTarget] = useState(0);
  const [end, setEnd] = useState(false);
  const [error ,setError] = useState(false);

  const guessSubmitHandler = async()=>{
    try {
      const gameData = await api.put(`/api/game/${gameId}`,{guess:guess});
      const game = gameData.data.game;
      const status = gameData.data.guess;
      const hint = gameData.data.hint;
      if(game.isGameOver){
        endMatch()
      }else{
        setAttempts(game.attemptsMade);
        setTotalAttempts(game.maxAttempts);
        setFeedback(status);
        setScore(game.score);
        setCorrectGuess(game.correctGuesses);
        setGuess('');
        setHint(hint);
      }
      
    } catch (err) {
      console.log(err)
    }
  }

  const quitHandler = () => {
    endMatch();
  };

  const endMatch = async()=>{
    try {
      const endData = await api.put(`api/game/end/${gameId}`);
      const game = endData.data.game;
      setEnd(true);
      setAttempts(game.attemptsMade);
      setTotalAttempts(game.maxAttempts);
      setScore(game.score);
      setCorrectGuess(game.correctGuesses);
      setTarget(game.latestTarget)
      setGuess('');
    } catch (err) {
      console.log(err)
    }
  }

  const restartHandler = async()=>{
    try {
      const  postGame = await api.post('/api/game');
      const game = postGame.data.game;
      setGameId(game._id);
      setTarget(game.latestTarget)
      setFeedback('');
      setAttempts(0);
      setTotalAttempts(game.maxAttempts);
      setScore(0);
      setGuess('');
      setHint(postGame.data.hint)
      setEnd(false)
    } catch (err) {
      setError(true)
      console.log(err)
    }
    
  }

  const feedbackClickHandler = ()=>{
    setFeedback('')
  }

  if(error)return(<p>Error : Something went wrong!</p>)

  return (
    <React.Fragment>
      <Headers isNavbar={false}/>
      <div className={classes.guess} >
        {end && <EndGame 
            status={attempts === totalAttempts ? 'attempts over!':'you quit!'} 
            attempts={attempts} 
            score={score} 
            target={target}
            correctGuess={correctGuess}
            onRestart={restartHandler}/>}
        <Score score={score} highest={highestScore} />
        <div className={classes.stats}>
          <p>Attempts : {attempts} / {totalAttempts} </p>
          <p>Correct Guess : {correctGuess}</p>
          <p>Hint : unit place digit is {hint}</p>
          <label>Guess the Number ?:</label>
          <input type="number" value={guess} onChange={(e) => setGuess(e.target.value)} className={classes.guessInput} />
        </div>
        <div className={classes.btnDiv}>
          <button onClick={guessSubmitHandler} className={classes.btn} disabled={feedback}  > Guess </button>
          <button onClick={quitHandler} className={classes.btn} style={{backgroundColor:'pink'}} >Quit Game</button>
        </div>
        {feedback && <Feedback feedback={feedback} onClick={feedbackClickHandler} />}
      </div>
    </React.Fragment>
  );
}

export default GuessNumber;
