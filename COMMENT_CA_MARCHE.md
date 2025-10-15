# 🔧 Comment ça marche ?

## 📊 Architecture du système

### Frontend (React + Vite)
- Interface utilisateur moderne
- Composants React pour chaque fonctionnalité
- Polling automatique pour la synchronisation

### Backend (Vercel Serverless Functions)
- API Routes dans le dossier `/api`
- Chaque fichier = un endpoint API
- Fonctionne automatiquement sur Vercel

### Base de données (Neon PostgreSQL)
- Base de données PostgreSQL serverless
- Gratuite jusqu'à 3 Go
- Compatible avec Vercel

---

## 🔄 Synchronisation en temps réel

### Comment ça fonctionne ?

Le système utilise le **polling** (vérification régulière) :

1. **Gossips/Affiches** : Rechargés toutes les 3 secondes
2. **Chat** : Messages rechargés toutes les 2 secondes
3. **Utilisateurs en ligne** : Mis à jour toutes les 30 secondes

### Pourquoi le polling ?

✅ Simple à implémenter  
✅ Fonctionne partout (Vercel, Netlify, etc.)  
✅ Pas besoin de WebSockets  
✅ Pas de configuration complexe  
✅ Gratuit  

### Optimisations

- Quand vous publiez quelque chose, ça recharge **immédiatement**
- Les autres utilisateurs voient la mise à jour dans les 2-3 secondes
- Pas de surcharge du serveur grâce aux intervalles raisonnables

---

## 📁 Structure du projet

```
lycee-gossip/
├── api/                      # API Routes (Vercel Serverless)
│   ├── db.js                # Configuration base de données
│   ├── gossips.js           # API pour les affiches
│   ├── chat.js              # API pour le chat
│   ├── online-users.js      # API pour les utilisateurs en ligne
│   ├── init.js              # Initialisation de la base
│   └── test.js              # Test de l'API
│
├── src/
│   ├── components/          # Composants React
│   │   ├── Login.jsx        # Page de connexion
│   │   ├── LyceeSelector.jsx # Sélection du lycée
│   │   ├── GossipFeed.jsx   # Fil des affiches
│   │   ├── GossipPost.jsx   # Affichage d'une affiche
│   │   ├── NewGossipModal.jsx # Modal pour créer une affiche
│   │   └── LiveChat.jsx     # Chat en direct
│   │
│   ├── lib/
│   │   └── supabase.js      # Helper API (fonctions pour appeler l'API)
│   │
│   ├── App.jsx              # Composant principal
│   ├── main.jsx             # Point d'entrée
│   └── index.css            # Styles globaux
│
├── .env                     # Variables d'environnement (DATABASE_URL)
├── vercel.json              # Configuration Vercel
├── vite.config.js           # Configuration Vite
└── package.json             # Dépendances
```

---

## 🗄️ Structure de la base de données

### Table `gossips`
```sql
id          SERIAL PRIMARY KEY
lycee_id    INTEGER           -- ID du lycée
author      TEXT              -- Pseudo de l'auteur
content     TEXT              -- Contenu de l'affiche
created_at  TIMESTAMP         -- Date de création
likes       JSONB             -- Liste des pseudos qui ont liké
comments    JSONB             -- Liste des commentaires
```

### Table `chat_messages`
```sql
id          SERIAL PRIMARY KEY
lycee_id    INTEGER           -- ID du lycée
author      TEXT              -- Pseudo de l'auteur
text        TEXT              -- Contenu du message
created_at  TIMESTAMP         -- Date de création
```

### Table `online_users`
```sql
id          SERIAL PRIMARY KEY
lycee_id    INTEGER           -- ID du lycée
pseudo      TEXT              -- Pseudo de l'utilisateur
last_seen   TIMESTAMP         -- Dernière activité
```

---

## 🔌 API Endpoints

### GET `/api/gossips?lyceeId=1`
Récupère toutes les affiches d'un lycée

### POST `/api/gossips`
Crée une nouvelle affiche
```json
{
  "lyceeId": 1,
  "author": "pseudo",
  "content": "Mon affiche"
}
```

### PUT `/api/gossips?id=123`
Met à jour une affiche (likes ou comments)
```json
{
  "likes": ["user1", "user2"]
}
```

### GET `/api/chat?lyceeId=1`
Récupère les messages du chat

### POST `/api/chat`
Envoie un message
```json
{
  "lyceeId": 1,
  "author": "pseudo",
  "text": "Salut !"
}
```

### GET `/api/online-users?lyceeId=1`
Récupère les utilisateurs en ligne

### POST `/api/online-users`
Met à jour la présence
```json
{
  "lyceeId": 1,
  "pseudo": "user1"
}
```

### GET `/api/init`
Initialise la base de données (crée les tables)

---

## 🚀 Déploiement sur Vercel

### Ce qui se passe automatiquement :

1. Vercel détecte que c'est un projet Vite
2. Build le frontend : `npm run build`
3. Déploie les fichiers statiques dans `dist/`
4. Déploie les API routes dans `/api` comme Serverless Functions
5. Configure les routes automatiquement

### Variables d'environnement :

Sur Vercel, ajoutez :
- `DATABASE_URL` = votre URL Neon

C'est tout ! Vercel gère le reste.

---

## 💡 Améliorations possibles

### Pour aller plus loin :

1. **WebSockets** : Pour un vrai temps réel (plus complexe)
2. **Authentification** : JWT, OAuth, etc.
3. **Modération** : Signaler/supprimer des messages
4. **Notifications** : Push notifications
5. **Images** : Upload d'images (avec Cloudinary ou S3)
6. **Réactions** : Emojis, GIFs, etc.
7. **Profils** : Pages de profil utilisateur
8. **Recherche** : Rechercher dans les affiches

---

## 🔒 Sécurité

### Actuellement :

- ✅ Pas de données sensibles stockées
- ✅ Connexion SSL à la base de données
- ✅ Variables d'environnement sécurisées
- ⚠️ Pas d'authentification forte (juste pseudo/mot de passe)
- ⚠️ Pas de validation côté serveur

### Pour la production :

- Ajouter une vraie authentification (JWT)
- Valider toutes les entrées côté serveur
- Limiter le nombre de requêtes (rate limiting)
- Ajouter CAPTCHA pour éviter les bots
- Modération du contenu

---

**Questions ? Consultez les autres guides !** 📚

