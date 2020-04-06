import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3220',
  withCredentials:true
});

export default api;