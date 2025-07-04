import '@fontsource/inter/400.css' // Regular
import '@fontsource/inter/600.css' // Semi-bold (optional)
import '@fontsource/inter/700.css' // Bold (optional)
import './assets/css/base.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import Router from './routes/Router'
import { ContextProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={Router} />
    </ContextProvider>
  </StrictMode>
)
