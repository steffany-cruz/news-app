import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://newsapi.org/v2/";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `${API_KEY}`,
    "X-Api-Key": `${API_KEY}`,
  },
});

export default api;
