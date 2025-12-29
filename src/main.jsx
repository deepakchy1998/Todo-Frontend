import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import axios from 'axios'
import App from './App.jsx'

// Use VITE_API_URL in production; fall back to localhost for dev
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'https://todo-backend-blond-seven.vercel.app/'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
