# 🚀 SENDO-API

**API REST pour l'analyse des transactions Solana avec données de prix historiques**

Une API TypeScript/Express qui décode et analyse les transactions Solana en temps réel, avec intégration BirdEye pour les données de prix.

## ⚠️ Statut du Projet

**🔄 EN DÉVELOPPEMENT ACTIF**

Ce projet est actuellement en cours de développement. Toutes les fonctionnalités sont en **work in progress** et peuvent être sujettes à des changements.

### 🚧 Fonctionnalités en Développement
- 🔄 Décodage des transactions Solana
- 🔄 Intégration BirdEye API
- 🔄 Analyse avancée des performances
- 🔄 Optimisation des rate limits
- 🔄 Tests automatisés
- 🔄 Documentation complète
- 🔄 Endpoints supplémentaires

### 📝 Notes de Développement
- Le projet est dans sa phase **alpha/beta**
- Les APIs peuvent changer sans préavis
- Certaines fonctionnalités peuvent être instables
- Les tests sont en cours d'implémentation

## ✨ Fonctionnalités

- 🔍 **Décodage automatique** des transactions Solana
- 💰 **Analyse des prix** avec BirdEye API
- 📊 **Support multi-protocoles** : Pump.fun, Jupiter, Raydium, Orca, Meteora, Whirlpool
- 🎯 **Calcul de performance** : gains/pertes, ATH, prix d'achat vs actuel
- 🛡️ **Sécurité** : Helmet, CORS, validation des entrées

## 🚀 Installation

```bash
# Cloner le projet
git clone <votre-repo>
cd sendo-api

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp env-sample .env
# Éditer .env avec vos clés API
```

## ⚙️ Configuration

Créez un fichier `.env` avec :

```env
PORT=4000
HELIUS_API_KEY=<votre_clé_helius>
BIRDEYE_API_KEY=<votre_clé_birdeye>
```

## 🎯 Utilisation

### Démarrer l'API

```bash
# Développement (hot-reload)
npm run dev

# Production
npm run build
npm start
```

### Endpoints Disponibles

| Endpoint | Description |
|----------|-------------|
| `GET /api/v1/signatures/:address` | Signatures d'une adresse |
| `GET /api/v1/tokens/:address` | Tokens détenus |
| `GET /api/v1/transactions/:address` | Transactions décodées |
| `GET /api/v1/trades/:address` | **Trades avec analyse de prix** |
| `GET /api/v1/nfts/:address` | NFTs détenus |
| `GET /api/v1/global/:address` | Vue d'ensemble |
| `GET /health` | Statut de l'API |

## 🤝 Rejoignez-nous !

Hey ! 👋 Ce projet est en développement et on a besoin de vous !

### 🚀 Vous voulez contribuer ?
Super ! C'est simple :
1. **Fork** le projet sur GitHub
2. **Clone** votre fork localement
3. **Créez** une branche pour votre idée
4. **Codez** votre fonctionnalité
5. **Ouvrez** une Pull Request

### 🐛 Vous avez trouvé un bug ?
Pas de panique ! 😅 
- Ouvrez une **Issue** sur GitHub
- Dites-nous ce qui ne va pas
- On va regarder ça ensemble !

### 💡 Vous avez une idée ?
Génial ! 🎉
- Partagez vos idées dans les **Issues**
- Racontez-nous comment vous utilisez l'API
- Aidez-nous à améliorer la doc

**Pas besoin d'être expert en Solana pour contribuer !** 😊

---

**🔄 EN DÉVELOPPEMENT ACTIF - Développé avec ❤️ pour l'écosystème Solana**
