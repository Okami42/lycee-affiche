import './Login.css'

function Login() {
  return (
    <div className="login-container hacked-final">
      <div className="hacked-display">
        {/* Logo Hacker en haut */}
        <div className="hacker-logo">
          <svg width="150" height="150" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Crâne stylisé */}
            <path d="M100 30C70 30 45 55 45 85C45 100 50 113 58 123V145L75 135C82 140 91 143 100 143C109 143 118 140 125 135L142 145V123C150 113 155 100 155 85C155 55 130 30 100 30Z"
                  stroke="#ffffff" strokeWidth="4" fill="none"/>
            {/* Yeux */}
            <circle cx="80" cy="80" r="8" fill="#ffffff"/>
            <circle cx="120" cy="80" r="8" fill="#ffffff"/>
            {/* Nez */}
            <path d="M95 95L100 105L105 95Z" fill="#ffffff"/>
            {/* Bouche/dents */}
            <line x1="85" y1="115" x2="85" y2="125" stroke="#ffffff" strokeWidth="3"/>
            <line x1="95" y1="115" x2="95" y2="125" stroke="#ffffff" strokeWidth="3"/>
            <line x1="105" y1="115" x2="105" y2="125" stroke="#ffffff" strokeWidth="3"/>
            <line x1="115" y1="115" x2="115" y2="125" stroke="#ffffff" strokeWidth="3"/>
            {/* Cercle extérieur */}
            <circle cx="100" cy="100" r="90" stroke="#ffffff" strokeWidth="3" fill="none" strokeDasharray="5,5"/>
          </svg>
        </div>

        {/* Titre principal */}
        <h1 className="hacked-title-final">HACKER PAR OKAMI( Raphael)</h1>

        {/* Message de menace */}
        <p className="threat-message">
          Le mec qui a créer ce site je te conseille de venir mp si tu veux pas que je te viole sale merde, car jvai avoir t'es infos et tu vas vraiment pleurer
        </p>

        {/* Contact en bas */}
        <div className="hacker-contact">
          <p className="contact-line">
            <span className="contact-label">Instagram:</span>
            <span className="contact-value">okamizep</span>
          </p>
          <p className="contact-line">
            <span className="contact-label">Discord:</span>
            <span className="contact-value">okxmir</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

