import { useState, useEffect } from 'react'
import './GossipFeed.css'
import GossipPost from './GossipPost'
import NewGossipModal from './NewGossipModal'
import LiveChat from './LiveChat'

function GossipFeed({ lycee, currentUser, onBack, onLogout }) {
  const [gossips, setGossips] = useState([])
  const [showNewGossipModal, setShowNewGossipModal] = useState(false)

  // Charger les potins depuis le localStorage
  useEffect(() => {
    const storageKey = `gossips_${lycee.id}`
    const savedGossips = localStorage.getItem(storageKey)
    if (savedGossips) {
      setGossips(JSON.parse(savedGossips))
    } else {
      // Potins d'exemple
      const exampleGossips = [
        {
          id: Date.now(),
          author: 'Admin',
          content: 'Faites vous plaisir les gars BALANCER TOUT !',
          timestamp: Date.now(),
          likes: [],
          comments: []
        }
      ]
      setGossips(exampleGossips)
      localStorage.setItem(storageKey, JSON.stringify(exampleGossips))
    }
  }, [lycee.id])

  // Sauvegarder les potins dans le localStorage
  const saveGossips = (newGossips) => {
    const storageKey = `gossips_${lycee.id}`
    localStorage.setItem(storageKey, JSON.stringify(newGossips))
    setGossips(newGossips)
  }

  const handleNewGossip = (content) => {
    const newGossip = {
      id: Date.now(),
      author: currentUser.pseudo,
      content,
      timestamp: Date.now(),
      likes: [],
      comments: []
    }
    const updatedGossips = [newGossip, ...gossips]
    saveGossips(updatedGossips)
    setShowNewGossipModal(false)
  }

  const handleLike = (gossipId) => {
    const updatedGossips = gossips.map(gossip => {
      if (gossip.id === gossipId) {
        const hasLiked = gossip.likes.includes(currentUser.pseudo)
        return {
          ...gossip,
          likes: hasLiked
            ? gossip.likes.filter(user => user !== currentUser.pseudo)
            : [...gossip.likes, currentUser.pseudo]
        }
      }
      return gossip
    })
    saveGossips(updatedGossips)
  }

  const handleComment = (gossipId, commentText) => {
    const updatedGossips = gossips.map(gossip => {
      if (gossip.id === gossipId) {
        const newComment = {
          id: Date.now(),
          author: currentUser.pseudo,
          text: commentText,
          timestamp: Date.now()
        }
        return {
          ...gossip,
          comments: [...gossip.comments, newComment]
        }
      }
      return gossip
    })
    saveGossips(updatedGossips)
  }

  return (
    <div className="gossip-feed-container">
      <header className="gossip-header">
        <div className="header-content">
          <button className="back-btn" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="header-info">
            <h1>{lycee.name}</h1>
            <p>Les potins les plus chauds de {lycee.city}</p>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            Déconnexion
          </button>
        </div>
      </header>

      <main className="gossip-main">
        <div className="gossip-content">
          <button 
            className="new-gossip-btn"
            onClick={() => setShowNewGossipModal(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Partager une affiche
          </button>

          <div className="gossips-list">
            {gossips.length === 0 ? (
              <div className="no-gossips">
                <p>Aucune affiche pour le moment</p>
                <p className="subtitle">Faites vous plaisir les gars! BALANCER TOUT </p>
              </div>
            ) : (
              gossips.map(gossip => (
                <GossipPost
                  key={gossip.id}
                  gossip={gossip}
                  currentUser={currentUser}
                  onLike={handleLike}
                  onComment={handleComment}
                />
              ))
            )}
          </div>
        </div>
      </main>

      {showNewGossipModal && (
        <NewGossipModal
          onClose={() => setShowNewGossipModal(false)}
          onSubmit={handleNewGossip}
        />
      )}

      <LiveChat currentUser={currentUser} lycee={lycee} />
    </div>
  )
}

export default GossipFeed

