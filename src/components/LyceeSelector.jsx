import './LyceeSelector.css'

const lycees = [
  { id: 1, name: 'Lycée DE TOUS SAINT QUENTIN', city: 'SAINT-QUENTIN' },
]

function LyceeSelector({ onSelectLycee, onLogout, currentUser }) {
  return (
    <div className="lycee-selector-container">
      <header className="lycee-header">
        <div className="header-content">
          <div className="logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white"/>
            </svg>
            <h1>Lycée - Affiche</h1>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            Déconnexion
          </button>
        </div>
      </header>

      <main className="lycee-main">
        <div className="lycee-content">
          <div className="welcome-section">
            <div className="icon-building">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L2 12H5V20H19V12H22L12 3Z" fill="white"/>
              </svg>
            </div>
            <h2>Sélectionne ton lycée</h2>
          </div>

          <div className="lycee-list">
            {lycees.map((lycee) => (
              <button
                key={lycee.id}
                className="lycee-item"
                onClick={() => onSelectLycee(lycee)}
              >
                <div className="lycee-info">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7V9H22V7L12 2Z" fill="currentColor"/>
                    <path d="M4 11V19H8V11H4Z" fill="currentColor"/>
                    <path d="M10 11V19H14V11H10Z" fill="currentColor"/>
                    <path d="M16 11V19H20V11H16Z" fill="currentColor"/>
                    <path d="M2 21H22V23H2V21Z" fill="currentColor"/>
                  </svg>
                  <div className="lycee-text">
                    <span className="lycee-name">{lycee.name}</span>
                    <span className="lycee-city">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                      </svg>
                      {lycee.city}
                    </span>
                  </div>
                </div>
                <svg className="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default LyceeSelector

