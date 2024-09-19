import React ,{useEffect ,useState} from "react";
import Headers from "../Layout/Headers";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import classes from './StartGame.module.css';
import useApi from "../../service/api";


const StartGame = ()=>{
    const navigate = useNavigate();
    const api = useApi();
    const [name , setName] = useState('');
    const [matches , setMatches] = useState(0);
    const [highestScore , setHighestScore] = useState(0);
    const [totalScore , setTotalScore] = useState(0);
    const [pastScores , setPastScores] = useState([]);
    const [loading , setLoading] = useState(true);
    const [error ,setError] = useState(false);
    useEffect(()=>{
        const apiCall = async()=>{
            try {
                const userDataApi = api.get('/api/user/info');
                const scoresDataApi = api.get('/api/user/score');
                const [userData, scoresData] = await Promise.all([
                    userDataApi,
                    scoresDataApi
                ]);
                const scores = scoresData.data.pastScore;
                setPastScores([...scores])
                const info = userData.data.data;
                setName(userData.data.name);
                setMatches(info.matches);
                setHighestScore(info.highestScore);
                setTotalScore(info.totalScore);
                setLoading(false)
            } catch (err) {
                setLoading(false);
                setError(true);
                console.log(err);
            }
        }

        apiCall();
    })
    const startMatchHandler =async()=>{
        try {
            const  postGame = await api.post('/api/game');
            const game  = postGame.data.game;
            const hint = postGame.data.hint;
            navigate(`/game/${game._id}?totalAttempts=${game.maxAttempts}&highestScore=${highestScore}&hint=${hint}`);
        } catch (err) {
            console.log(err);
        }
        
    }

    if(loading)return (<p>Loading....!</p>)

    if(error)return (<p>Error : Something went wrong!</p>)
    return (
        <React.Fragment>
        <Headers isNavbar={true}/>
        <div className={classes.homeDiv}>
           <Profile name={name} highestScore={highestScore} totalScore={totalScore} matches={matches} scores={pastScores}/>
            <div className={classes.startBtnDiv}>
                <div>
                    <p>this is guess a number game.</p>
                    <p>you have to guess a number from 0 to 100.</p>
                    <p>you have 7 attempts at start.</p>
                    <p>for every correct guess you get 2 extra attempts.</p>
                    <p>game ends when you run out of attempts.</p>
                </div>
                <button onClick={startMatchHandler} className={classes.btn} >Start</button>
            </div>
        </div>
        </React.Fragment>
    )
}

export default StartGame;