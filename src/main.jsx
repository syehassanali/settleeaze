import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './context/AuthContext'

const rootElement = document.getElementById('root')

try {
  if (!rootElement) throw new Error('Root element not found')
  
  const root = ReactDOM.createRoot(rootElement)
  
  // Correct order: BrowserRouter wraps AuthProvider
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  )
} catch (error) {
  const errorContainer = document.createElement('div')
  errorContainer.style.padding = '20px'
  errorContainer.style.backgroundColor = '#ffdddd'
  errorContainer.style.color = '#ff0000'
  
  errorContainer.innerHTML = `
    <h1>Application Failed to Load</h1>
    <p><strong>Error:</strong> ${error.message}</p>
    <p>Check the browser console for more details</p>
  `
  
  document.body.appendChild(errorContainer)
  console.error('App initialization error:', error)
}