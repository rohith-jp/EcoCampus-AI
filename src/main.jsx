import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#fdfffd',
          color: '#111d14',
          border: '1px solid #daeade',
          fontFamily: "'DM Sans', sans-serif",
        },
      }}
    />
  </React.StrictMode>,
)
