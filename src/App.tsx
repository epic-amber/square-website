import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SquarePage } from './SquarePage'
import { CareersPage } from './CareersPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SquarePage />} />
        <Route path="/careers" element={<CareersPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
