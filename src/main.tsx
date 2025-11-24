import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' // Hapus baris ini jika Anda tidak punya file index.css

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)