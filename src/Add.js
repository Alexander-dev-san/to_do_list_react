import React, { useState } from "react";
import "./Add.scss";

function Add(props) {
  const [check, setCheck] = useState(props.task.isCheck);

  return (
    <div className="Add-block">
      <input
        type="checkbox"
        className="checkbox"
        checked={check}
        onChange={() =>
          props.saveElement(props.index, props.task.text, !check) &&
          setCheck(!check)
        }
      />

      {check ? (
        <span className="checkFalse">{props.task.text}</span>
      ) : (
        <span>{props.task.text}</span>
      )}
      <div className="Add-block_button">
        <button onClick={() => props.editEl(props.index)} id="edit"></button>
        <button
          onClick={() => props.deleteEl(props.index)}
          id="delete"
        ></button>
      </div>
    </div>
  );
}

export default Add;
