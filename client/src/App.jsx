import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import HomePage from './pages/HomePage'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from './store/authSlice'

// import Navbar from './components/Navbar'

function App() {
  const dispatch = useDispatch()
  const { isLoginModalOpen } = useSelector((state) => state.ui)

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch])

  return (
    <>
      {isLoginModalOpen && <Login />}
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='' element={<HomePage />} />
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
