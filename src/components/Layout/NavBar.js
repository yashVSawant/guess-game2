import React from "react";

import { Link } from "react-router-dom";
import classes from './Headers.module.css'

const NavBar = (props)=>{

    return <nav>
        <ul>
            <li><Link to="/" className={classes.links}>home</Link></li>
            <li><Link to="/leaderboard" className={classes.links}>Leaderboard</Link></li>
            <li><Link to="/logout" className={classes.links}>Logout</Link></li>
        </ul>
    </nav>
}

export default NavBar;