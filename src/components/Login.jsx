import { useState } from 'react'
import './Login.css'

function Login({ onLogin }) {
  const [pseudo, setPseudo] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!pseudo || !password) {
      setError('Veuillez remplir tous les champs')
      return
    }

    if (pseudo.length < 3) {
      setError('Le pseudo doit contenir au moins 3 caractères')
      return
    }

    if (password.length < 4) {
      setError('Le mot de passe doit contenir au moins 4 caractères')
      return
    }

    // Récupérer les utilisateurs existants
    const users = JSON.parse(localStorage.getItem('users') || '[]')

    if (isRegister) {
      // Vérifier si le pseudo existe déjà
      if (users.find(u => u.pseudo === pseudo)) {
        setError('Ce pseudo est déjà pris')
        return
      }

      // Créer un nouvel utilisateur
      const newUser = { pseudo, password }
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))
      onLogin({ pseudo })
    } else {
      // Vérifier les identifiants
      const user = users.find(u => u.pseudo === pseudo && u.password === password)
      if (!user) {
        setError('Pseudo ou mot de passe incorrect')
        return
      }
      onLogin({ pseudo })
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <div className="logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white"/>
            </svg>
            <h1>Lycée - Affiche</h1>
          </div>
          <p className="subtitle">Merci de créer un compte sans votre nom prénom pour être anonyme</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="pseudo">Pseudo</label>
            <input
              type="text"
              id="pseudo"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              placeholder="Ton pseudo"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ton mot de passe"
              autoComplete={isRegister ? "new-password" : "current-password"}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-btn">
            {isRegister ? "S'inscrire" : 'Se connecter'}
          </button>

          <div className="toggle-mode">
            {isRegister ? (
              <p>
                Déjà un compte ?{' '}
                <button type="button" onClick={() => setIsRegister(false)}>
                  Se connecter
                </button>
              </p>
            ) : (
              <p>
                Pas encore de compte ?{' '}
                <button type="button" onClick={() => setIsRegister(true)}>
                  S'inscrire
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

