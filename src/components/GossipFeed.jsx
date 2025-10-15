import { useState, useEffect } from 'react'
import './GossipFeed.css'
import GossipPost from './GossipPost'
import NewGossipModal from './NewGossipModal'
import LiveChat from './LiveChat'
import { api } from '../lib/supabase'

function GossipFeed({ lycee, currentUser, onBack, onLogout }) {
  const [gossips, setGossips] = useState([])
  const [showNewGossipModal, setShowNewGossipModal] = useState(false)

  // Charger les potins depuis l'API
  useEffect(() => {
    loadGossips()

    // Polling pour simuler le temps réel (toutes les 3 secondes)
    const interval = setInterval(loadGossips, 3000)

    return () => clearInterval(interval)
  }, [lycee.id])

  const loadGossips = async () => {
    try {
      const data = await api.getGossips(lycee.id)

      if (data && data.length > 0) {
        const formattedGossips = data.map(g => ({
          id: g.id,
          author: g.author,
          content: g.content,
          timestamp: new Date(g.created_at).getTime(),
          likes: g.likes || [],
          comments: g.comments || []
        }))
        setGossips(formattedGossips)
      } else {
        setGossips([])
      }
    } catch (error) {
      console.error('Erreur lors du chargement des gossips:', error)
    }
  }

  const handleNewGossip = async (content) => {
    try {
      await api.createGossip(lycee.id, currentUser.pseudo, content)
      setShowNewGossipModal(false)
      loadGossips() // Recharger immédiatement
    } catch (error) {
      console.error('Erreur lors de la création du gossip:', error)
      alert('Erreur lors de la publication.')
    }
  }

  const handleLike = async (gossipId) => {
    try {
      const gossip = gossips.find(g => g.id === gossipId)
      if (!gossip) {
        console.error('Gossip non trouvé:', gossipId)
        return
      }

      const hasLiked = gossip.likes.includes(currentUser.pseudo)
      const newLikes = hasLiked
        ? gossip.likes.filter(user => user !== currentUser.pseudo)
        : [...gossip.likes, currentUser.pseudo]

      console.log('Mise à jour des likes:', { gossipId, newLikes })
      const result = await api.updateGossip(gossipId, { likes: newLikes })
      console.log('Résultat:', result)

      await loadGossips() // Recharger immédiatement
    } catch (error) {
      console.error('Erreur lors du like:', error)
      alert('Erreur lors du like. Vérifiez la console.')
    }
  }

  const handleComment = async (gossipId, commentText) => {
    try {
      const gossip = gossips.find(g => g.id === gossipId)
      if (!gossip) {
        console.error('Gossip non trouvé:', gossipId)
        return
      }

      const newComment = {
        id: Date.now(),
        author: currentUser.pseudo,
        text: commentText,
        timestamp: Date.now()
      }

      const newComments = [...gossip.comments, newComment]
      console.log('Ajout du commentaire:', { gossipId, newComment, newComments })

      const result = await api.updateGossip(gossipId, { comments: newComments })
      console.log('Résultat:', result)

      await loadGossips() // Recharger immédiatement
    } catch (error) {
      console.error('Erreur lors du commentaire:', error)
      alert('Erreur lors du commentaire. Vérifiez la console.')
    }
  }

  const handleDelete = async (gossipId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette affiche ?')) {
      return
    }

    try {
      await api.deleteGossip(gossipId, currentUser.pseudo)
      loadGossips() // Recharger immédiatement
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      alert('Erreur lors de la suppression.')
    }
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
            <p>Les meilleurs affiches de {lycee.city}</p>
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
                  onDelete={handleDelete}
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

