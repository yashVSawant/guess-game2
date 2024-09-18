import React from 'react';
import classes from './Button.module.css'

const Button = (props)=>{
    return (<button {...props} onClick={props.onClick} className={classes.buyButton}>{props.name}</button>)
}

export default Button;

