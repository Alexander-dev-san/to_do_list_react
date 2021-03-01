import axios from "axios";
import React, { useState } from "react";
import './Save.scss';

function Save(props) {
  const [check, setCheck] = useState(props.task.isCheck);

  return (
    <div className='Add-block'>
      <input type='checkbox' checked={check} onChange={() => setCheck(!check)}/>

        <input type="text" value={props.task.text} onChange={() => }/>

      <div className='Add-block_button'>
        <button>Save</button>
        <button onClick={() => props.editEl(true)}>Cancel</button>
      </div>
      
      
    </div> 
  );
}

export default Save;