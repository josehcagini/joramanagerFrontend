import axios from 'axios';

export default axios.create({
  baseURL: `${import.meta.env.VITE_API_URL_DEV}:${import.meta.env.VITE_API_PORT_DEV}`,
  headers: {'Content-Type': 'application/json'}
})
