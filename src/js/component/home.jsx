import React, { useState, useEffect } from "react";

function Home() {
  const [todos, setTodos] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://playground.4geeks.com/apis/fake/todos/user/OmarSaadane',
          {
            method: "POST",
            body: JSON.stringify({}),
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setTodos(data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const updateCounter = () => {
    return tasks.length;
  };

  return (
    <div className="container" style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#ffffff' }}>
      <h1 className="text-center mt-5">Todo List</h1>
      <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Enter new task..." />
      <button onClick={addTask} className="btn btn-primary">Add Task</button>
      <ul className="list-group mt-3">
        {tasks.map((task, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center py-0">
            {task}
            <button onClick={() => removeTask(index)} className="btn btn-danger">x</button>
          </li>
        ))}
      </ul>
      <p className="text-center mt-3">Total tasks: {updateCounter()}</p>
    </div>
  );
}

export default Home;