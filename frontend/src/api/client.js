import axios from 'axios'
const API_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000"

export const BACKEND_CLIENT = axios.create({
    baseURL: `${API_URL}`,
})

BACKEND_CLIENT.interceptors.request.use(config => {
  const access_token = localStorage.getItem('access_token')
  config.headers.Authorization = `Bearer ${access_token}`
  return config
})