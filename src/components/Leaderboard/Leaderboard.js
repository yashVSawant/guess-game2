import React ,{useState , useEffect} from "react";
import Headers from "../Layout/Headers";
import Player from "./Players";
import useApi from "../../service/api";

import classes from "./Leaderboard.module.css"

const Leaderboard = ()=>{
    const api = useApi();
    const [players , setPlayers] = useState([]);
    const [type ,setType] = useState('highestScore');

    useEffect(()=>{
        const apiCall =async()=>{
            try {
                const top10Data = await api.get(`/api/user/leaderboard/${type}`);
                const topTen = top10Data.data.topTen;
                setPlayers([...topTen])
            } catch (err) {
                console.log(err)
            }
        }
        apiCall();
    },[type])

    return (
        <React.Fragment>
            <Headers isNavbar={true}/>
            <div className={classes.leaderboardBtn}><button onClick={()=>{setType('highestScore')}} className={classes.btn} >highest score</button>
            <button onClick={()=>{setType('totalScore')}} className={classes.btn} >total score</button></div>
            <ul>
                {players.map((p)=>{return <Player 
                key={p._id} 
                name={p.userId.name} 
                score={type === 'highestScore' ?p.highestScore :p.totalScore}/>})}
            </ul>
        </React.Fragment>
    )
}

export default Leaderboard;