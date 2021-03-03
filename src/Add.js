import React, { useState } from "react";
import "./Add.scss";

function Add(props) {
  const [check, setCheck] = useState(props.task.isCheck);

  return (
    <div className="Add-block">
      <div className="Abb-block_text">
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
          <p className="checkFalse">{props.task.text}</p>
        ) : (
          <p>{props.task.text}</p>
        )}
      </div>
      <div className="Add-block_button">
        <button
          onClick={() => (!check) ? props.editEl(props.index) : alert("Вы не можете изменить выполненную задачу")}
          id="edit"
        ></button>
        <button
          onClick={() => props.deleteEl(props.index)}
          id="delete"
        ></button>
      </div>
    </div>
  );
}

export default Add;
