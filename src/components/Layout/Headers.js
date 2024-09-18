import React from "react";

import NavBar from "./NavBar";

import classes from './Headers.module.css'

const Headers = (props)=>{

    return <header className={classes.header}>
        <h2> ? Number Guessing Game</h2>
        {props.isNavbar && <NavBar/>}
    </header>
}

export default Headers