import React,{useState} from "react";

import Input from "../UI/Input";
import Modal from "../UI/Modal";
import { Link ,useNavigate } from "react-router-dom";
import useApi from "../../service/api";
import { useAuth } from "./AuthContext";
import Button from "../UI/Button";

import classes from './Auth.module.css'

const Login = ()=>{
    const api = useApi();
    const [email ,setEmail] = useState('');
    const [password ,setPassword] = useState('');
    const [errorMessage , setErrorMesaage] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();
    const emailChangeHandler =(value)=>{
        setEmail(value)
    }
    const passwordChangeHandler =(value)=>{
        setPassword(value)
    }
    const loginHanlder = async(event)=>{
        event.preventDefault();
        try {
            console.log(email ,password)
            const tokenData = await api.post('/api/auth/login',{email,password});
            const token = tokenData.data.token;
            login(token);
            setEmail('');
            setPassword('');
            navigate('/');
        } catch (err) {
            const message = err.response.data.message || 'something went wrong!';
            setErrorMesaage(message);
            setTimeout(()=>{
                setErrorMesaage('');
            },3000)
        }
        
    }
    
    return (
        <Modal>
            <form className={classes.authForm} onSubmit={loginHanlder}>
                <Input type="email" name="email" value={email} onChange={emailChangeHandler} />
                <Input type="password" name="password" value={password} onChange={passwordChangeHandler} />
                <Button type="submit" name="Login"/>
                <p style={{color:'red'}}>{errorMessage}</p>
                <p>new user ?<Link to="/signup">Signup</Link></p>
            </form>
        </Modal>
    )
}

export default Login;
