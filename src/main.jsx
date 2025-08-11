import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "antd/dist/reset.css"
import "./context/i18n";
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
