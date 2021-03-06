import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080',
  headers: {
    "Content-type": "application/json",
    "Content-Type": "multipart/form-data"
  }
});