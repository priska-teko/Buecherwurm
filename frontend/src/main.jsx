import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { BooksContextProvider } from './context/BooksContext'

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <BooksContextProvider>
        <App />
      </BooksContextProvider>
    </BrowserRouter>
  </StrictMode>
)
