import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'
import { BrowserRouter } from 'react-router-dom' // Import BrowserRouter

const rootElement = document.getElementById('root')

try {
  if (!rootElement) throw new Error('Root element not found')
  
  const root = ReactDOM.createRoot(rootElement)
  
  // Wrap your App with BrowserRouter
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
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