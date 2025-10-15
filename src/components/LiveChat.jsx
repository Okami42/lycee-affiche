import { useState, useEffect, useRef } from 'react'
import './LiveChat.css'
import { api } from '../lib/supabase'

function LiveChat({ currentUser, lycee }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [onlineUsers, setOnlineUsers] = useState([])
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Charger les messages depuis l'API
  useEffect(() => {
    if (isOpen) {
      loadMessages()
      loadOnlineUsers()

      // Polling pour le temps réel
      const interval = setInterval(() => {
        loadMessages()
        loadOnlineUsers()
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [isOpen, lycee.id])

  const loadMessages = async () => {
    try {
      const data = await api.getChatMessages(lycee.id)
      const formattedMessages = data.map(m => ({
        id: m.id,
        author: m.author,
        text: m.text,
        timestamp: new Date(m.created_at).getTime()
      }))
      setMessages(formattedMessages)
    } catch (error) {
      console.error('Erreur chargement messages:', error)
    }
  }

  const loadOnlineUsers = async () => {
    try {
      const data = await api.getOnlineUsers(lycee.id)
      setOnlineUsers(data.map(u => ({ pseudo: u.pseudo, timestamp: new Date(u.last_seen).getTime() })))
    } catch (error) {
      console.error('Erreur chargement utilisateurs:', error)
    }
  }

  // Mettre à jour la présence de l'utilisateur
  useEffect(() => {
    if (isOpen) {
      updatePresence()

      const interval = setInterval(updatePresence, 30000)
      return () => clearInterval(interval)
    }
  }, [isOpen, currentUser.pseudo, lycee.id])

  const updatePresence = async () => {
    try {
      await api.updatePresence(lycee.id, currentUser.pseudo)
    } catch (error) {
      console.error('Erreur mise à jour présence:', error)
    }
  }

  // Auto-scroll vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const messageToSend = newMessage
      setNewMessage('') // Vider immédiatement pour meilleure UX
      try {
        console.log('Envoi du message:', messageToSend)
        const result = await api.sendChatMessage(lycee.id, currentUser.pseudo, messageToSend)
        console.log('Message envoyé:', result)
        await loadMessages() // Recharger immédiatement
      } catch (error) {
        console.error('Erreur envoi message:', error)
        alert('Erreur lors de l\'envoi du message. Vérifiez la console.')
        setNewMessage(messageToSend) // Restaurer le message en cas d'erreur
      }
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
              <div key={index} className={`chat-user-pill ${user.pseudo === 'Admin' ? 'admin-pill' : ''}`}>
                <span className={`user-avatar-small ${user.pseudo === 'Admin' ? 'admin-avatar-small' : ''}`}>
                  {user.pseudo[0].toUpperCase()}
                </span>
                <span className={user.pseudo === 'Admin' ? 'admin-name' : ''}>
                  {user.pseudo}
                </span>
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
                    <div className={`message-avatar ${message.author === 'Admin' ? 'admin-avatar' : ''}`}>
                      {message.author[0].toUpperCase()}
                    </div>
                  )}
                  <div className="message-content">
                    <div className="message-bubble">
                      <span className={`message-author-in-bubble ${message.author === 'Admin' ? 'admin-name' : ''}`}>
                        {message.author}
                      </span>
                      <p>{message.text}</p>
                      <span className="message-time">{formatTimestamp(message.timestamp)}</span>
                    </div>
                  </div>
                  {message.author === currentUser.pseudo && (
                    <div className={`message-avatar ${message.author === 'Admin' ? 'admin-avatar' : ''}`}>
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

