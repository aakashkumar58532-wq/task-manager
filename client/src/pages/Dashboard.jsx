import { useEffect, useState } from "react";
import API from "../api/axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    try {
      await API.post(
        "/tasks",
        {
          title,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setTitle("");
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={addTask}>
        Add Task
      </button>

      <hr />

      {tasks.map((task) => (
        <div key={task._id}>
          <h3>{task.title}</h3>

          <button
            onClick={() => deleteTask(task._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;