import axios from "axios";
import React, { useState } from "react";
import './Add.scss';

function Add(props) {
  const [check, setCheck] = useState(props.task.isCheck);

  return (
    <div className='Add-block'>
      <input type='checkbox' checked={check} onChange={() => setCheck(!check)}/>

      {
        check ? (<span className='checkFalse'>{props.task.text}</span>) : (<span>{props.task.text}</span>)
      }
      <div className='Add-block_button'>
        <button onClick={() => props.editEl(props.index)}>Edit</button>
        <button onClick={() => props.deleteEl(props.index)}>Delete</button>
      </div>
      
      
    </div> 
  );
}

export default Add;