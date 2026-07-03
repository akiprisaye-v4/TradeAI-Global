import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Attendre que le DOM soit prêt
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp)
} else {
  startApp()
}

function startApp() {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

import "./mobile-production-fixes.css";
