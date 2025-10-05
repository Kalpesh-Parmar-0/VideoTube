import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import HomePage from './pages/HomePage'
// import Navbar from './components/Navbar'

function App() {
  return (
    <div className='overflow-hidden'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='' element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
