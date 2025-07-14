import '@fontsource/inter/400.css' // Regular
import '@fontsource/inter/600.css' // Semi-bold (optional)
import '@fontsource/inter/700.css' // Bold (optional)
import './assets/css/base.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import Router from './routes/Router'
import { ContextProvider } from './context/AuthContext'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const theme = createTheme({
  typography: {
    fontFamily: `'Inter', sans-serif` // This applies to all typography variants
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: `'Inter', sans-serif`
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: `'Inter', sans-serif`
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: `'Inter', sans-serif`
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: `'Inter', sans-serif`
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontFamily: `'Inter', sans-serif`
        }
      }
    }
  }
})

const queryclient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <ContextProvider>
        <QueryClientProvider client={queryclient}>
          <RouterProvider router={Router} />
        </QueryClientProvider>
      </ContextProvider>
    </ThemeProvider>
  </StrictMode>
)
