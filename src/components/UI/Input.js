import React from "react";

const Input = (props)=>{
    const onChangeHandler = (event)=>{
        const value = event.target.value;
        props.onChange(value);
    }
    return (
        <React.Fragment>
            <label>{props.name}</label>
            <input {...props}  onChange={onChangeHandler}/>
        </React.Fragment>
    )
}

export default Input;