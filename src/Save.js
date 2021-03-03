import React, { useState } from "react";
import "./Save.scss";

function Save(props) {
  const [check, setCheck] = useState(props.task.isCheck);
  const [textInput, setTextInput] = useState(props.task.text);

  const deleteTextInput = (e) => {
    if (e.key === "Backspace" && textInput == "" && e.repeat == false)
      props.deleteEl(props.index);
  };

  return (
    <div className="Save-block">
      <div className="Abb-block_text">
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
          id="save_inp"
          autoFocus
          onKeyDown={(e) => deleteTextInput(e)}
          onChange={(e) => setTextInput(e.target.value)}
        />
      </div>
      <div className="Save-block_button">
        <button
          onClick={() => {
            if (textInput !== "") {
              props.saveElement(props.index, textInput, check) &&
                props.editEl(false);
            } else {
              props.editEl(true);
            }
          }}
          id="saveBtn"
        ></button>
        <button onClick={() => props.editEl(true)} id="cancel"></button>
      </div>
    </div>
  );
}

export default Save;
