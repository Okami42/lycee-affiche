# Configuration Neon Database pour LycéeGossip

## 🚀 Étape 1 : Créer un compte Neon (GRATUIT)

1. Allez sur [https://neon.tech](https://neon.tech)
2. Cliquez sur "Sign up" ou "Get started"
3. Créez un compte (avec GitHub, Google, ou email)
4. Créez un nouveau projet :
   - Nom du projet : `lycee-gossip`
   - Région : Europe (Frankfurt) ou la plus proche de vous
   - Postgres version : 16 (par défaut)
5. Cliquez sur "Create project"

## 🔑 Étape 2 : Récupérer votre URL de connexion

1. Une fois le projet créé, vous verrez une page avec "Connection string"
2. Copiez la **Connection string** complète qui ressemble à :
   ```
   postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```
3. **IMPORTANT** : Gardez cette URL en sécurité, elle contient votre mot de passe !

## 📝 Étape 3 : Configurer les variables d'environnement

1. Ouvrez le fichier `.env` à la racine du projet
2. Remplacez la valeur `DATABASE_URL` par votre URL de connexion Neon :

```env
DATABASE_URL=postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
```

## 🗄️ Étape 4 : Initialiser la base de données

### Option A : Via l'interface Neon (Recommandé)

1. Dans votre projet Neon, allez dans **SQL Editor**
2. Copiez-collez ce code SQL :

```sql
-- Table pour les potins/affiches
CREATE TABLE gossips (
  id SERIAL PRIMARY KEY,
  lycee_id INTEGER NOT NULL,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  likes JSONB DEFAULT '[]'::jsonb,
  comments JSONB DEFAULT '[]'::jsonb
);

-- Table pour les messages du chat
CREATE TABLE chat_messages (
  id SERIAL PRIMARY KEY,
  lycee_id INTEGER NOT NULL,
  author TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table pour les utilisateurs en ligne
CREATE TABLE online_users (
  id SERIAL PRIMARY KEY,
  lycee_id INTEGER NOT NULL,
  pseudo TEXT NOT NULL,
  last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(lycee_id, pseudo)
);

-- Index pour améliorer les performances
CREATE INDEX idx_gossips_lycee ON gossips(lycee_id);
CREATE INDEX idx_gossips_created ON gossips(created_at DESC);
CREATE INDEX idx_chat_lycee ON chat_messages(lycee_id);
CREATE INDEX idx_chat_created ON chat_messages(created_at DESC);
```

3. Cliquez sur **Run** ou **Execute**
4. Vous devriez voir "Success"

### Option B : Via l'API d'initialisation

1. Démarrez votre serveur de développement : `npm run dev`
2. Ouvrez votre navigateur et allez sur : `http://localhost:5173/api/init`
3. Vous devriez voir : `{"message":"Database initialized successfully"}`

## 🚀 Étape 5 : Déployer sur Vercel

### Via l'interface Vercel (Recommandé)

1. Créez un compte sur [https://vercel.com](https://vercel.com)
2. Cliquez sur "Add New" > "Project"
3. Importez votre repository GitHub/GitLab
4. Configurez le projet :
   - Framework Preset : **Vite**
   - Build Command : `npm run build`
   - Output Directory : `dist`
5. Ajoutez la variable d'environnement :
   - Cliquez sur "Environment Variables"
   - Ajoutez : `DATABASE_URL` = votre URL de connexion Neon
6. Cliquez sur "Deploy"

### Via Vercel CLI

1. Installez Vercel CLI :
   ```bash
   npm install -g vercel
   ```
2. Dans le dossier du projet, lancez :
   ```bash
   vercel
   ```
3. Suivez les instructions
4. Ajoutez la variable d'environnement :
   ```bash
   vercel env add DATABASE_URL
   ```
   Puis collez votre URL de connexion Neon

## ✅ C'est terminé !

Votre site est maintenant configuré avec une vraie base de données en temps réel !

- ✅ Les potins se synchronisent automatiquement (toutes les 3 secondes)
- ✅ Les commentaires apparaissent pour tous les utilisateurs
- ✅ Le chat fonctionne en direct (toutes les 2 secondes)
- ✅ Fonctionne parfaitement sur Vercel
- ✅ **Gratuit** jusqu'à 3 Go de données avec Neon

## 🔄 Comment ça marche ?

Le système utilise un **polling** (vérification régulière) :
- Les gossips sont rechargés toutes les 3 secondes
- Les messages du chat toutes les 2 secondes
- Quand vous publiez quelque chose, ça recharge immédiatement

C'est simple, efficace et ça fonctionne partout !

## 🆘 Besoin d'aide ?

Si vous avez des problèmes :

1. **Erreur de connexion à la base de données** :
   - Vérifiez que `DATABASE_URL` est correcte dans `.env`
   - Vérifiez que vous avez bien copié l'URL complète depuis Neon

2. **Les tables n'existent pas** :
   - Allez sur `http://localhost:5173/api/init` pour les créer automatiquement
   - Ou exécutez le SQL manuellement dans Neon SQL Editor

3. **Rien ne s'affiche** :
   - Ouvrez la console du navigateur (F12)
   - Vérifiez s'il y a des erreurs
   - Redémarrez le serveur : `npm run dev`

4. **Sur Vercel, ça ne fonctionne pas** :
   - Vérifiez que `DATABASE_URL` est bien configurée dans les Environment Variables
   - Allez sur `https://votre-site.vercel.app/api/init` pour initialiser la base

## 📚 Ressources

- [Documentation Neon](https://neon.tech/docs)
- [Documentation Vercel](https://vercel.com/docs)
- [Guide Vercel + Neon](https://vercel.com/guides/using-neon-with-vercel)

