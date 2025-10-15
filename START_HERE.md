# 🎯 COMMENCEZ ICI !

## 👋 Bienvenue sur LycéeGossip

Votre site est **presque prêt** ! Il vous reste juste à configurer la base de données pour que tout fonctionne en temps réel.

---

## ⚡ Configuration rapide (5 minutes)

### Étape 1 : Créer un compte Neon
👉 Allez sur **[neon.tech](https://neon.tech)**  
👉 Créez un compte (gratuit)  
👉 Créez un projet nommé `lycee-gossip`

### Étape 2 : Copier l'URL de connexion
Vous verrez une "Connection string" :
```
postgresql://user:pass@ep-xxx.aws.neon.tech/neondb?sslmode=require
```
**Copiez-la !**

### Étape 3 : Configurer le projet
1. Ouvrez le fichier `.env`
2. Remplacez `DATABASE_URL=...` par votre URL
3. Sauvegardez

### Étape 4 : Initialiser la base
```bash
npm run dev
```
Puis ouvrez : **http://localhost:5173/api/init**

### Étape 5 : Tester !
Allez sur **http://localhost:5173** et créez un compte !

---

## 📚 Guides disponibles

Choisissez selon votre besoin :

### 🚀 Débutant
- **`LISEZMOI.md`** → Résumé ultra-rapide
- **`GUIDE_SIMPLE.txt`** → Guide visuel étape par étape

### 📖 Intermédiaire
- **`README_SETUP.md`** → Guide de configuration complet
- **`SETUP_SUPABASE.md`** → Guide détaillé avec SQL

### 🔧 Avancé
- **`COMMENT_CA_MARCHE.md`** → Architecture et fonctionnement

---

## ✅ Fonctionnalités

- ✅ Connexion/Inscription
- ✅ Publier des affiches
- ✅ Liker et commenter
- ✅ Chat en direct
- ✅ Utilisateurs en ligne
- ✅ **Synchronisation automatique**
- ✅ Déployable sur Vercel
- ✅ 100% GRATUIT

---

## 🌐 Déployer sur Vercel

Une fois que ça marche en local :

1. Allez sur **[vercel.com](https://vercel.com)**
2. Importez votre projet GitHub
3. Ajoutez `DATABASE_URL` dans Environment Variables
4. Cliquez sur Deploy

**C'est tout !** 🎉

---

## ❓ Besoin d'aide ?

### Problème de connexion à la base ?
→ Vérifiez `DATABASE_URL` dans `.env`

### Les tables n'existent pas ?
→ Allez sur `http://localhost:5173/api/init`

### Rien ne s'affiche ?
→ Ouvrez la console (F12) et regardez les erreurs

### Autre problème ?
→ Consultez `GUIDE_SIMPLE.txt`

---

## 🎓 Structure du projet

```
lycee-gossip/
├── api/              # Backend (API Serverless)
├── src/              # Frontend (React)
├── .env              # Configuration (DATABASE_URL)
└── Guides...         # Documentation
```

---

## 🚀 Commandes utiles

```bash
# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la production
npm run preview
```

---

**Bon courage ! 💪**

**Commencez par `LISEZMOI.md` ou `GUIDE_SIMPLE.txt` !**

