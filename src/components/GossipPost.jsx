import { useState } from 'react'
import './GossipPost.css'

function GossipPost({ gossip, currentUser, onLike, onComment, onDelete }) {
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState('')

  const hasLiked = gossip.likes.includes(currentUser.pseudo)
  const canDelete = currentUser.pseudo === 'Admin' || gossip.author === currentUser.pseudo

  const formatTimestamp = (timestamp) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "À l'instant"
    if (minutes < 60) return `Il y a ${minutes} min`
    if (hours < 24) return `Il y a ${hours}h`
    return `Il y a ${days}j`
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (commentText.trim()) {
      onComment(gossip.id, commentText)
      setCommentText('')
    }
  }

  return (
    <div className="gossip-post">
      <div className="gossip-header-post">
        <div className="author-info">
          <div className="author-avatar">
            {gossip.author[0].toUpperCase()}
          </div>
          <div className="author-details">
            <span className="author-name">{gossip.author}</span>
            <span className="timestamp">{formatTimestamp(gossip.timestamp)}</span>
          </div>
        </div>
        {canDelete && (
          <button
            className="delete-btn"
            onClick={() => onDelete(gossip.id)}
            title="Supprimer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>

      <div className="gossip-content">
        <p>{gossip.content}</p>
      </div>

      <div className="gossip-actions">
        <button 
          className={`action-btn like-btn ${hasLiked ? 'liked' : ''}`}
          onClick={() => onLike(gossip.id)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={hasLiked ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill={hasLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <span>{gossip.likes.length}</span>
        </button>

        <button 
          className="action-btn comment-btn"
          onClick={() => setShowComments(!showComments)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <span>{gossip.comments.length}</span>
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <div className="comments-list">
            {gossip.comments.map(comment => (
              <div key={comment.id} className="comment">
                <div className="comment-avatar">
                  {comment.author[0].toUpperCase()}
                </div>
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-author">{comment.author}</span>
                    <span className="comment-timestamp">{formatTimestamp(comment.timestamp)}</span>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>

          <form className="comment-form" onSubmit={handleSubmitComment}>
            <input
              type="text"
              placeholder="Ajoute un commentaire..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="submit" disabled={!commentText.trim()}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default GossipPost

