import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import HomePage from './pages/HomePage'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { refreshAndFetchUser } from './store/slices/authSlice'
import Channel from './pages/Channel'
import ChannelVideos from './pages/ChannelVideos'
import ChannelTweets from './pages/ChannelTweets'
import History from './pages/History'

// import Navbar from './components/Navbar'

function App() {
  const dispatch = useDispatch()
  const { isLoginModalOpen } = useSelector((state) => state.ui)

  useEffect(() => {
    dispatch(refreshAndFetchUser())
  }, [dispatch])

  return (
    <>
      {isLoginModalOpen && <Login />}
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='' element={<HomePage />} />
          <Route path='/channel/:username' element={<Channel />}>
            <Route path='videos' element={<ChannelVideos />} />
            <Route path='playlists' element={''} />
            <Route path='tweets' element={<ChannelTweets />} />
            <Route path='subscribed' element={''} />
          </Route>
          <Route path='/history' element={<History />}></Route>
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

// todo: Channel.jsx complete