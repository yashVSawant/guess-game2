import React,{useState} from "react";

import Input from "../UI/Input";
import Modal from "../UI/Modal";
import { Link ,useNavigate } from "react-router-dom";
import useApi from '../../service/api'

import classes from './Auth.module.css'

const Signup = ()=>{
    const api = useApi();
    const navigate = useNavigate();
    const [name ,setName] = useState('');
    const [email ,setEmail] = useState('');
    const [password ,setPassword] = useState('');
    const [confirmPassword ,setConfirmPassword] = useState('');
    const [errorMessage ,setErrorMesaage] = useState('')
    
    const nameChangeHandler =(value)=>{
        setName(value)
    }
    const emailChangeHandler =(value)=>{
        setEmail(value)
    }
    const passwordChangeHandler =(value)=>{
        setPassword(value)
    }
    const confirmPasswordChangeHandler =(value)=>{
        setConfirmPassword(value)
    }
    const singupHandler = async(event)=>{
        event.preventDefault();
        try {
            console.log(name ,email , password , confirmPassword);
            await api.post('/api/auth/register',{name , email,password});
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            navigate('/login');
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
        <form className={classes.authForm} onSubmit={singupHandler}>
            <Input type="text" name="name" value={name} onChange={nameChangeHandler} />
            <Input type="email" name="email" value={email} onChange={emailChangeHandler} />
            <Input type="password" name="password" value={password} onChange={passwordChangeHandler} />
            <Input type="password" name="confirm password" value={confirmPassword} onChange={confirmPasswordChangeHandler} />
            <button type="submit">Signup</button>
            <p style={{color:'red'}}>{errorMessage}</p>
            <p>already have account ?<Link to="/login">Login</Link></p>
        </form>
        </Modal>
    )
}

export default Signup;