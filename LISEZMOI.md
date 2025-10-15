# 🎓 LycéeGossip - Configuration

## 🚀 Pour faire fonctionner le site en temps réel

Votre site utilise maintenant **Neon Database** (gratuit) pour synchroniser les données entre tous les utilisateurs.

### ⚡ Configuration en 3 étapes :

#### 1. Créer un compte Neon (gratuit)
👉 **[neon.tech](https://neon.tech)** → Sign up → Créer un projet

#### 2. Copier l'URL de connexion
Vous verrez une "Connection string" comme :
```
postgresql://user:pass@ep-xxx.aws.neon.tech/neondb?sslmode=require
```

#### 3. Configurer le fichier `.env`
Ouvrez `.env` et remplacez `DATABASE_URL=...` par votre URL

### 🗄️ Initialiser la base de données

**Méthode simple** :
1. `npm run dev`
2. Ouvrez : `http://localhost:5173/api/init`
3. Vous devriez voir : `{"message":"Database initialized successfully"}`

**OU via Neon SQL Editor** :
- Copiez le SQL depuis `SETUP_SUPABASE.md`
- Exécutez-le dans Neon SQL Editor

---

## 📚 Guides disponibles

- **`GUIDE_SIMPLE.txt`** → Guide visuel étape par étape
- **`README_SETUP.md`** → Guide rapide (5 min)
- **`SETUP_SUPABASE.md`** → Guide complet et détaillé

---

## ✅ Fonctionnalités

- ✅ Publier des affiches/potins
- ✅ Liker et commenter
- ✅ Chat en direct
- ✅ Utilisateurs en ligne
- ✅ **Synchronisation automatique entre tous les utilisateurs**
- ✅ Fonctionne sur Vercel
- ✅ 100% GRATUIT

---

## 🌐 Déployer sur Vercel

1. Allez sur **[vercel.com](https://vercel.com)**
2. Importez votre projet GitHub
3. Ajoutez `DATABASE_URL` dans Environment Variables
4. Deploy !

---

## ❓ Problèmes ?

Consultez `GUIDE_SIMPLE.txt` ou ouvrez la console (F12) pour voir les erreurs.

---

**Bon courage ! 🚀**

