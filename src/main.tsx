import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Disable browser scroll restoration — the browser's async scroll restore
// fires ~1s after mount and triggers the navbar divider via the scroll listener.
// In an SPA, scroll position is managed by the router, not the browser.
if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}
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
