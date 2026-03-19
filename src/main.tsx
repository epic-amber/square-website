import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/mona-sans/300.css'
import '@fontsource/mona-sans/400.css'
import '@fontsource/mona-sans/500.css'
import '@fontsource/mona-sans/600.css'
import '@fontsource/bitter/500.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
