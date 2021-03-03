import React, { useState, useEffect } from "react";
import "./App.scss";
import axios from "axios";
import Add from "./Add";
import Save from "./Save";
import FlashMessage from "./FlashMessage";
import { Button, TextField } from "@material-ui/core";
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

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(async () => {
    await axios.get("http://localhost:8000/allTasks").then((res) => {
      setTasks(res.data.data);
    });
  }, []);

  const addNewTask = async () => {
    await axios
      .post("http://localhost:8000/createTask", {
        text,
        isCheck: false,
      })
      .then((res) => {
        setText("");
        setTasks(res.data.data);
      });
  };

  const deleteElement = async (index) => {
    await axios
      .delete(`http://localhost:8000/deleteTask?id=${tasks[index].id}`, {
        method: "DELETE",
      })
      .then((res) => {
        setTasks(res.data.data);
      });
  };

  const saveElement = async (index, text, isCheck) => {
    await axios
      .patch("http://localhost:8000/updateTask", {
        id: tasks[index].id,
        text: text,
        isCheck: isCheck,
      })
      .then((res) => {
        setTasks(res.data.data);
      });
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onKeyDownEnter = (e) => {
    if (e.key == "Enter" && text != "") {
      addNewTask();
    } else if (text === "" && e.key == "Enter") {
      setOpen(true);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>To-Do List</h1>
        <form className="App_form" noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            label="Введите вашу задачу"
            type="text"
            value={text}
            onKeyDown={(e) => onKeyDownEnter(e)}
            onChange={(e) => setText(e.target.value)}
            maxLength="60"
            autoFocus
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => (text != "" ? addNewTask() : setOpen(true))}
            id="add_btn"
          >
            Add new
          </Button>
        </form>
      </header>
      <div className="Add">
        {tasks.map((task, index) =>
          !(edit === index) ? (
            <Add
              task={task}
              deleteEl={deleteElement}
              editEl={setEdit}
              index={index}
              key={`task-${index}`}
              saveElement={saveElement}
            />
          ) : (
            <Save
              task={task}
              key={`task-${index}`}
              editEl={setEdit}
              saveElem={saveElement}
              deleteEl={deleteElement}
              index={index}
              setText={setText}
              saveElement={saveElement}
            />
          )
        )}
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Введите значение!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
