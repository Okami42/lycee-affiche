import { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import LyceeSelector from './components/LyceeSelector'
import GossipFeed from './components/GossipFeed'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [selectedLycee, setSelectedLycee] = useState(null)

  useEffect(() => {
    // Vérifier si un utilisateur est déjà connecté
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
    setSelectedLycee(null)
    localStorage.removeItem('currentUser')
  }

  const handleLyceeSelect = (lycee) => {
    setSelectedLycee(lycee)
  }

  const handleBack = () => {
    setSelectedLycee(null)
  }

  if (!currentUser) {
    return <Login onLogin={handleLogin} />
  }

  if (!selectedLycee) {
    return (
      <LyceeSelector
        onSelectLycee={handleLyceeSelect}
        onLogout={handleLogout}
        currentUser={currentUser}
      />
    )
  }

  return (
    <GossipFeed
      lycee={selectedLycee}
      currentUser={currentUser}
      onBack={handleBack}
      onLogout={handleLogout}
    />
  )
}

export default App
