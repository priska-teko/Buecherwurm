// src/App.jsx
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Navbar from './components/Navbar'
import SearchPage from './pages/SearchPage'

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </div>
  )
}
