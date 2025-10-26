# One Piece Client

## Projet lié
Cette application est utilisé conjointement avec le projet serveur disponible ici :
https://github.com/MateoDubernet/One-Piece-Server

---

## Installation & Lancement
### 1. Cloner le projet
```bash
    git clone <url-du-repo>
    cd <nom-du-dossier>
```

### 2. Installer les dépendances
```bash
    npm install
```

### 3. Lancer l’application côté client
Exécuter la commande :
```bash
    ng serve
```

### 4. Lancer l’application côté serveur
Lien serveur: https://github.com/MateoDubernet/One-Piece-Server

### 5. Ouvrir l'application
- Aller à l'adresse localhost:4200

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
