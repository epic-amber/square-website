import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { SquarePage } from './SquarePage'
import { AboutPage } from './AboutPage'
import { CareersPage } from './CareersPage'
import { VacancyPage } from './VacancyPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<SquarePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/:id" element={<VacancyPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
