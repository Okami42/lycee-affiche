# 🚀 Configuration Rapide - LycéeGossip

## ⚡ Démarrage rapide (5 minutes)

### 1️⃣ Créer un compte Neon (GRATUIT)

👉 Allez sur **[neon.tech](https://neon.tech)** et créez un compte

### 2️⃣ Créer un projet

- Nom : `lycee-gossip`
- Région : Europe
- Cliquez sur "Create project"

### 3️⃣ Copier l'URL de connexion

Vous verrez une **Connection string** qui ressemble à :
```
postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
```

**Copiez-la !** 📋

### 4️⃣ Configurer le projet

1. Ouvrez le fichier `.env` dans le projet
2. Remplacez la ligne `DATABASE_URL=...` par votre URL copiée

### 5️⃣ Initialiser la base de données

**Option A** : Via Neon SQL Editor
- Allez dans votre projet Neon > SQL Editor
- Copiez le SQL depuis `SETUP_SUPABASE.md` (section "Option A")
- Exécutez-le

**Option B** : Via l'API (plus simple)
1. Démarrez le projet : `npm run dev`
2. Ouvrez : `http://localhost:5173/api/init`
3. Vous devriez voir : `{"message":"Database initialized successfully"}`

### 6️⃣ C'est prêt ! 🎉

Votre site fonctionne maintenant avec une vraie base de données !

---

## 🌐 Déployer sur Vercel

### Étapes :

1. Allez sur **[vercel.com](https://vercel.com)**
2. Créez un compte (gratuit)
3. Cliquez sur "Add New" > "Project"
4. Importez votre repository GitHub
5. Dans "Environment Variables", ajoutez :
   - Nom : `DATABASE_URL`
   - Valeur : votre URL Neon
6. Cliquez sur "Deploy"

**C'est tout !** Votre site sera en ligne en 2 minutes 🚀

---

## ❓ Problèmes courants

### "Cannot connect to database"
➡️ Vérifiez que `DATABASE_URL` dans `.env` est correcte

### "Table does not exist"
➡️ Allez sur `http://localhost:5173/api/init` pour créer les tables

### Rien ne s'affiche
➡️ Ouvrez la console (F12) et vérifiez les erreurs

---

## 📖 Documentation complète

Pour plus de détails, consultez **`SETUP_SUPABASE.md`**

---

## 🎯 Fonctionnalités

✅ Publier des affiches/potins  
✅ Liker et commenter  
✅ Chat en direct  
✅ Utilisateurs en ligne  
✅ Synchronisation automatique  
✅ Fonctionne sur Vercel  
✅ 100% GRATUIT  

---

**Bon courage ! 💪**

