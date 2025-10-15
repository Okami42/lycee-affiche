import { useState, useEffect, useRef } from 'react'
import './LiveChat.css'

function LiveChat({ currentUser, lycee }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [onlineUsers, setOnlineUsers] = useState([])
  const messagesEndRef = useRef(null)
  const chatStorageKey = `chat_${lycee.id}`
  const usersStorageKey = `chat_users_${lycee.id}`

  // Charger les messages depuis le localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem(chatStorageKey)
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    }
  }, [chatStorageKey])

  // Gérer les utilisateurs en ligne
  useEffect(() => {
    if (isOpen) {
      // Ajouter l'utilisateur actuel à la liste des utilisateurs en ligne
      const users = JSON.parse(localStorage.getItem(usersStorageKey) || '[]')
      const userEntry = {
        pseudo: currentUser.pseudo,
        timestamp: Date.now()
      }
      
      // Filtrer les utilisateurs inactifs (plus de 5 minutes)
      const activeUsers = users.filter(u => Date.now() - u.timestamp < 300000)
      
      // Ajouter ou mettre à jour l'utilisateur actuel
      const updatedUsers = activeUsers.filter(u => u.pseudo !== currentUser.pseudo)
      updatedUsers.push(userEntry)
      
      localStorage.setItem(usersStorageKey, JSON.stringify(updatedUsers))
      setOnlineUsers(updatedUsers)

      // Mettre à jour la présence toutes les 30 secondes
      const interval = setInterval(() => {
        const users = JSON.parse(localStorage.getItem(usersStorageKey) || '[]')
        const activeUsers = users.filter(u => Date.now() - u.timestamp < 300000)
        const updatedUsers = activeUsers.filter(u => u.pseudo !== currentUser.pseudo)
        updatedUsers.push({ pseudo: currentUser.pseudo, timestamp: Date.now() })
        localStorage.setItem(usersStorageKey, JSON.stringify(updatedUsers))
        setOnlineUsers(updatedUsers)
      }, 30000)

      return () => clearInterval(interval)
    }
  }, [isOpen, currentUser.pseudo, usersStorageKey])

  // Écouter les changements dans le localStorage (pour la synchronisation entre onglets)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === chatStorageKey) {
        const newMessages = JSON.parse(e.newValue || '[]')
        setMessages(newMessages)
      }
      if (e.key === usersStorageKey) {
        const users = JSON.parse(e.newValue || '[]')
        const activeUsers = users.filter(u => Date.now() - u.timestamp < 300000)
        setOnlineUsers(activeUsers)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [chatStorageKey, usersStorageKey])

  // Auto-scroll vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        author: currentUser.pseudo,
        text: newMessage,
        timestamp: Date.now()
      }
      
      const updatedMessages = [...messages, message]
      setMessages(updatedMessages)
      localStorage.setItem(chatStorageKey, JSON.stringify(updatedMessages))
      setNewMessage('')
    }
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  }

  const unreadCount = 0 // Vous pouvez implémenter un système de comptage des messages non lus

  return (
    <>
      {/* Bouton flottant */}
      <button 
        className={`chat-float-btn ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white"/>
        </svg>
        {unreadCount > 0 && <span className="chat-badge">{unreadCount}</span>}
      </button>

      {/* Fenêtre de chat */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <h3>Chat en direct</h3>
              <span className="online-count">
                <span className="online-dot"></span>
                {onlineUsers.length} en ligne
              </span>
            </div>
            <button className="chat-close-btn" onClick={() => setIsOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <div className="chat-users">
            {onlineUsers.map((user, index) => (
              <div key={index} className="chat-user-pill">
                <span className="user-avatar-small">{user.pseudo[0].toUpperCase()}</span>
                {user.pseudo}
              </div>
            ))}
          </div>

          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="chat-empty">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="#e0e0e0"/>
                </svg>
                <p>Aucun message pour le moment</p>
                <p className="chat-empty-subtitle">Sois le premier à dire quelque chose !</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-message ${message.author === currentUser.pseudo ? 'own-message' : ''}`}
                >
                  {message.author !== currentUser.pseudo && (
                    <div className="message-avatar">
                      {message.author[0].toUpperCase()}
                    </div>
                  )}
                  <div className="message-content">
                    <div className="message-bubble">
                      <span className="message-author-in-bubble">{message.author}</span>
                      <p>{message.text}</p>
                      <span className="message-time">{formatTimestamp(message.timestamp)}</span>
                    </div>
                  </div>
                  {message.author === currentUser.pseudo && (
                    <div className="message-avatar">
                      {message.author[0].toUpperCase()}
                    </div>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Écris un message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              maxLength={500}
            />
            <button type="submit" disabled={!newMessage.trim()}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default LiveChat

