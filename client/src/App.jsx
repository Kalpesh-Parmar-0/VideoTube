import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import HomePage from './pages/HomePage'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
// import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='' element={<HomePage />} />
        </Route>
        <Route path='/login' element={<Login />}>
        </Route>
      </Routes>

      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          error: {
            style: { borderRadius: '2', color: 'red' },
          },
          success: {
            style: { borderRadius: '2', color: 'green' },
          },
          duration: 2000
        }}
      />
    </>
  )
}

export default App
