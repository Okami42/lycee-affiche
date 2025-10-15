import { useState } from 'react'
import './NewGossipModal.css'

function NewGossipModal({ onClose, onSubmit }) {
  const [content, setContent] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (content.trim()) {
      onSubmit(content)
      setContent('')
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Partager un potin</h2>
          <button className="close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Qu'est-ce qui se passe dans ton lycée ? 👀"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={500}
            autoFocus
          />
          <div className="modal-footer">
            <span className="char-count">{content.length}/500</span>
            <div className="modal-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Annuler
              </button>
              <button type="submit" className="submit-btn" disabled={!content.trim()}>
                Publier
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewGossipModal

