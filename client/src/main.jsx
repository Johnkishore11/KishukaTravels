import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios'

// All axios requests go through the Vite proxy (/api → localhost:5000)
// and always send the HttpOnly JWT cookie
axios.defaults.baseURL = 'http://localhost:5173'
axios.defaults.withCredentials = true

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
