import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Analytics from './components/Analytics'
import Newsletter from './components/Newsletter'
import Cards from './components/Cards'
import Footer from './components/Footer'
import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'
import TrialFormPage from './pages/TrialFormPage'

const Home = () => {
  return (
    <>
      <Hero />
      <Analytics />
      <Newsletter />
      <Cards />
    </>
  )
}

const App = () => {
  return (
    <div>
       <Navbar />
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/signup" element={<AuthPage mode="signup" />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/start-trial" element={<TrialFormPage />} />
       </Routes>
       <Footer />
    </div>
  )
}

export default App

