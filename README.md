# One Piece Client

## Contexte

### Description
Il s'agit d'un projet réaliser durant mon alternance dans le but de me former aux frameworks Angular et Spring.
Ceci est la partie client du projet qui utilise le framework Angular et le language Typescript, il communique avec le serveur via des requêtes http pour envoyer et recevoir des données.

### Projet lié
Cette application est utilisé conjointement avec le projet serveur disponible ici :
https://github.com/MateoDubernet/One-Piece-Server

---

## Prérequis

- Node.js et npm installés
- Angular CLI installé globalement (`npm install -g @angular/cli`)

---

## Installation & Lancement
### 1. Cloner le projet
```bash
    git clone https://github.com/MateoDubernet/One-Piece-Client.git
    cd One-Piece-Client
```

### 2. Installer les dépendances
```bash
    npm install --force
```

### 3. Lancer l’application côté client
```bash
    ng serve
```

### 4. Lancer l’application côté serveur
Lien serveur: https://github.com/MateoDubernet/One-Piece-Server

### 5. Ouvrir l'application
Aller à l'adresse localhost:4200

---

## Fonctionnalités
Il y a 3 liens dans la navbar et chaqu'un redirige vers une page du même nom.
1. Navire
2. Crew
3. Member

### Navire
Il y a un quadrillage avec des images d'eau et un navire.
Cliquer sur le navire permet de le déplacer sur le quadrillage avec les flèches directionnels, cliquer de nouveau dessus le bloquera sur la case où il est.

### Crew
Un tableau listant des équipages.
Permet de créer et modifier des équipages.

### Member
Un tableau listant des membres d'équipages.
Permet de créer et modifier des membres.
Nécessaires d'avoir au moins créer un équipage pour créer des membres.
