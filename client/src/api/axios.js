import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-kjhs.onrender.com/api",
});

export default API;