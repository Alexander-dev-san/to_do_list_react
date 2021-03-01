import React, { useState } from "react";
import "./Save.scss";

function Save(props) {
  const [check, setCheck] = useState(props.task.isCheck);
  const [textInput, setTextInput] = useState(props.task.text);

  return (
    <div className="Save-block">
      <input
        type="checkbox"
        className="checkbox"
        checked={check}
        onChange={() =>
          setCheck(!check) && props.saveElement(props.index, textInput, check)
        }
      />

      <input
        type="text"
        value={textInput}
        id='save_inp'
        onChange={(e) => setTextInput(e.target.value)}
      />

      <div className="Save-block_button">
        <button
          onClick={() =>
            props.saveElement(props.index, textInput, check) &&
            props.editEl(false)
          }
          id="saveBtn"
        ></button>
        <button onClick={() => props.editEl(true)} id="cancel"></button>
      </div>
    </div>
  );
}

export default Save;
