import React from "react";
import "./App.css";

function ValueChanger(props) {
    const {onValueChange, label} = props;
    return <button className='btns' onClick={onValueChange}>{label}</button>
}

export default ValueChanger;