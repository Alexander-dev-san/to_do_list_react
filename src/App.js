import React, { useState, useEffect } from "react";
import "./App.scss";
import axios from "axios";
import Add from "./Add";
import Save from "./Save";

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

  return (
    <div className="App">
      <header>
        <h1>To-Do List</h1>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength="60"
          id="add_inp"
        />
        <button onClick={() => addNewTask()} id="add_btn">
          Add new
        </button>
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
              index={index}
              setText={setText}
              saveElement={saveElement}
            />
          )
        )}
      </div>
    </div>
  );
}

export default App;
