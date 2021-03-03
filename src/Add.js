import React, { useState } from "react";
import "./Add.scss";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function Add(props) {
  const [check, setCheck] = useState(props.task.isCheck);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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
        <p className={check ? "checkFalse" : ""}>{props.task.text}</p>
      </div>
      <div className="Add-block_button">
        <button
          onClick={() => (!check ? props.editEl(props.index) : setOpen(true))}
          id="edit"
        ></button>
        <button
          onClick={() => props.deleteEl(props.index)}
          id="delete"
        ></button>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Вы не можете исправить выполненное действие!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Add;
