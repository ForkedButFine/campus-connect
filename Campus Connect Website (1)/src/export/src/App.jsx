import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Home from './components/Home/Home'
import Posts from './components/Posts/Posts'
import Messages from './components/Chat/Messages'
import ChatBot from './components/Chat/ChatBot'
import Profile from './components/Profile/Profile'
import Events from './components/Events/Events'
import Teachers from './components/Profile/Teachers'
import JobPlacement from './components/Career/JobPlacement'
import ProjectFunding from './components/Academic/ProjectFunding'
import AntiRagging from './components/Support/AntiRagging'
import FriendFinder from './components/Social/FriendFinder'
import Marketplace from './components/Marketplace/Marketplace'
import StudyGroups from './components/Academic/StudyGroups'
import LostAndFound from './components/Campus/LostAndFound'
import CampusMap from './components/Campus/CampusMap'
import SkillExchange from './components/Academic/SkillExchange'
import QnABoard from './components/Academic/QnABoard'
import Alumni from './components/Career/Alumni'
import Feedback from './components/System/Feedback'
import About from './components/System/About'
import { loadSeedData } from './services/dataService'
import './styles/App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [appData, setAppData] = useState({
    users: [],
    posts: [],
    messages: [],
    events: [],
    teachers: [],
    jobs: [],
    alumni: []
  })

  useEffect(() => {
    // Load seed data on mount
    const initData = async () => {
      const data = await loadSeedData()
      setAppData(data)
    }
    initData()

    // Check for existing session
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogin = (user) => {
    setCurrentUser(user)
    localStorage.setItem('currentUser', JSON.stringify(user))
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
  }

  // Protected route wrapper
  const ProtectedRoute = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" replace />
  }

  return (
    <div className="app">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login onLogin={handleLogin} users={appData.users} />} />
        <Route path="/signup" element={<Signup onSignup={handleLogin} />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Home currentUser={currentUser} onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        <Route path="/posts" element={
          <ProtectedRoute>
            <Posts currentUser={currentUser} onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        <Route path="/messages" element={
          <ProtectedRoute>
            <Messages currentUser={currentUser} onLogout={handleLogout} users={appData.users} teachers={appData.teachers} />
          </ProtectedRoute>
        } />
        <Route path="/chatbot" element={
          <ProtectedRoute>
            <ChatBot currentUser={currentUser} onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        <Route path="/events" element={
          <ProtectedRoute>
            <Events currentUser={currentUser} onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        <Route path="/teachers" element={
          <ProtectedRoute>
            <Teachers currentUser={currentUser} onLogout={handleLogout} teachers={appData.teachers} />
          </ProtectedRoute>
        } />
        <Route path="/jobs" element={
          <ProtectedRoute>
            <JobPlacement currentUser={currentUser} onLogout={handleLogout} jobs={appData.jobs} />
          </ProtectedRoute>
        } />
        <Route path="/funding" element={
          <ProtectedRoute>
            <ProjectFunding currentUser={currentUser} onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        <Route path="/anti-ragging" element={
          <ProtectedRoute>
            <AntiRagging currentUser={currentUser} onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        <Route path="/friend-finder" element={
          <ProtectedRoute>
            <FriendFinder currentUser={currentUser} onLogout={handleLogout} users={appData.users} />
          </ProtectedRoute>
        } />
        <Route path="/marketplace" element={
          <ProtectedRoute>
            <Marketplace currentUser={currentUser} onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        <Route path="/study-groups" element={
          <ProtectedRoute>
            <StudyGroups currentUser={currentUser} onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        <Route path="/lost-found" element={
          <ProtectedRoute>
            <LostAndFound currentUser={currentUser} onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        <Route path="/campus-map" element={
          <ProtectedRoute>
            <CampusMap currentUser={currentUser} onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        <Route path="/skills" element={
          <ProtectedRoute>
            <SkillExchange currentUser={currentUser} onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        <Route path="/qna" element={
          <ProtectedRoute>
            <QnABoard currentUser={currentUser} onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        <Route path="/alumni" element={
          <ProtectedRoute>
            <Alumni currentUser={currentUser} onLogout={handleLogout} alumni={appData.alumni} />
          </ProtectedRoute>
        } />
        <Route path="/feedback" element={
          <ProtectedRoute>
            <Feedback currentUser={currentUser} onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        <Route path="/about" element={
          <ProtectedRoute>
            <About currentUser={currentUser} onLogout={handleLogout} />
          </ProtectedRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to={currentUser ? "/" : "/login"} replace />} />
      </Routes>
    </div>
  )
}

export default App
