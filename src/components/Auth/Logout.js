import React from "react";

import Button from '../UI/Button';
import Modal from "../UI/Modal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import classes from './Auth.module.css'

const Logout = ()=>{
    const navigate = useNavigate();
    const {logout} = useAuth();
    const logoutHandler = (event)=>{
        event.preventDefault()
        localStorage.removeItem('token');
        logout();
        navigate('/');
    }
    const cancelLogout = (event)=>{
        event.preventDefault();
        navigate(-1);
    }
    return (
        <Modal>
        <form className={classes.authForm}>
            <h2>
                are you sure?
            </h2>
            <div>
                <Button onClick={logoutHandler} name="Yes" />
                <Button onClick={cancelLogout} name="No" />
            </div>
            
        </form>
        </Modal>
    )
}

export default Logout;