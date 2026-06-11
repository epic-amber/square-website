import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SquarePage } from './SquarePage'
import { AboutPage } from './AboutPage'
import { CareersPage } from './CareersPage'
import { VacancyPage } from './VacancyPage'

function App() {
  return (
    <BrowserRouter>
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
