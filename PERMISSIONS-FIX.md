# Problème : Les données du formulaire ne s'affichent pas pour les autres utilisateurs

## Causes possibles :

1. **Le script n'est pas déployé avec les bonnes permissions** (le plus probable)
2. **Le Google Sheet n'est pas partagé correctement**
3. **Le script n'a pas les autorisations nécessaires**

---

## Solution étape par étape :

### 1. Vérifier le déploiement du Google Apps Script

1. Ouvrez votre Google Sheet : https://docs.google.com/spreadsheets/d/1qoB9iVUOnD45OBlWjJxhQ5s6L4IZKK1B6GmyJxgqoag

2. Allez dans **Extensions > Apps Script**

3. Cliquez sur **Déployer > Gérer les déploiements**

4. Cliquez sur l'icône **✏️ (modifier)** à côté de votre déploiement actif

5. **VÉRIFIEZ CES PARAMÈTRES :**
   - **Description** : "Formulaire ELAN BC"
   - **Exécuter en tant que** : **Moi** (votre compte Google)
   - **Qui a accès** : **🟢 N'IMPORTE QUI** (CRUCIAL !)
     - ⚠️ Si c'est "Moi" ou "Seulement moi", les autres utilisateurs ne peuvent pas utiliser le formulaire !
     - ✅ Il DOIT être "N'importe qui" pour fonctionner publiquement

6. Cliquez sur **Déployer**

7. Si une nouvelle version est créée, **copiez la nouvelle URL** et mettez à jour dans `App.tsx`

---

### 2. Vérifier les permissions du Google Sheet

1. Ouvrez votre Google Sheet

2. Cliquez sur le bouton **Partager** (en haut à droite)

3. Dans "Accès général", vérifiez que c'est :
   - ✅ **"Toute personne disposant du lien"** avec **"Éditeur"** OU
   - ✅ Au minimum **"Lecteur"** si le script écrit les données pour vous

4. **⚠️ IMPORTANT :** Le script a besoin d'autorisation pour écrire dans le sheet. Si le sheet n'est pas partagé, le script ne peut écrire que pour vous.

---

### 3. Vérifier les autorisations du script

1. Dans Apps Script, allez dans **Exécutions** (menu de gauche)

2. Regardez les dernières exécutions :
   - Si vous voyez des erreurs comme "Authorization required" → Cliquez dessus et autorisez
   - Si vous voyez "User does not have permission" → Vérifiez le partage du sheet

---

### 4. Tester depuis un navigateur privé

1. Ouvrez un **onglet de navigation privée** (Ctrl+Shift+N / Cmd+Shift+N)

2. Visitez votre site déployé (pas localhost)

3. Remplissez et envoyez le formulaire

4. Vérifiez dans Apps Script > **Exécutions** si une nouvelle exécution apparaît

5. Si aucune exécution n'apparaît → Le problème vient du déploiement/permissions

---

### 5. Vérifier les logs dans Apps Script

1. Dans Apps Script, allez dans **Exécutions**

2. Cliquez sur une exécution récente

3. Regardez les **logs** :
   - Si vous voyez "=== DÉBUT doPost ===" → Le script reçoit les données
   - Si vous voyez des erreurs → Notez le message d'erreur

---

### 6. Solution rapide : Redéployer le script

Si rien ne fonctionne, redéployez complètement :

1. Dans Apps Script, cliquez sur **Déployer > Gérer les déploiements**

2. Supprimez l'ancien déploiement (icône 🗑️)

3. Cliquez sur **Nouveau déploiement**

4. Cliquez sur l'icône ⚙️ à côté de "Sélectionner le type"

5. Choisissez **"Application Web"**

6. Configurez :
   - **Description** : "Formulaire ELAN BC v2"
   - **Exécuter en tant que** : Moi
   - **Qui a accès** : **N'IMPORTE QUI** ← CRUCIAL !

7. Cliquez sur **Déployer**

8. **Copiez la nouvelle URL** et mettez-la dans `App.tsx` :
   ```typescript
   const GOOGLE_SCRIPT_URL = "NOUVELLE_URL_ICI";
   ```

9. Redéployez votre site web

---

## Checklist de vérification :

- [ ] Le script est déployé avec "Qui a accès : N'IMPORTE QUI"
- [ ] Le Google Sheet est partagé (au minimum "Toute personne disposant du lien" en Lecteur)
- [ ] Le script a les autorisations nécessaires (vérifié dans Exécutions)
- [ ] La nouvelle URL est mise à jour dans App.tsx
- [ ] Le site web est redéployé avec la nouvelle URL
- [ ] Test effectué depuis un navigateur privé

---

## Si le problème persiste :

1. **Partagez les logs d'exécution** depuis Apps Script > Exécutions

2. **Vérifiez la console du navigateur** (F12) quand un utilisateur envoie le formulaire

3. **Vérifiez l'URL du script** dans le code source de la page déployée pour confirmer qu'elle est correcte

