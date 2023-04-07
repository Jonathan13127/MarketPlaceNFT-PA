# MarketPlace NFT

Je suis ravi que vous ayez pris le temps de lire ce readme ! Je suis en train de construire une plateforme innovante pour l'achat et la vente d'objets non-fongibles (NFT) axée sur le thème de l'automobile et je voudrais partager ma vision avec vous.

Mon objectif est de créer un espace convivial pour les passionnés d'automobile et les artistes qui peuvent présenter leurs créations uniques liées à l'automobile et les mettre en vente en toute sécurité. Je crois que les NFT représentent l'avenir de la propriété numérique et je veux être à l'avant-garde de ce mouvement en me concentrant sur le thème de l'automobile.

Je suis en train de travailler dur pour fournir une expérience utilisateur fluide et intuitif. Je veux que la navigation sur mon site soit simple et agréable, pour que vous puissiez trouver rapidement ce que vous cherchez.

Je suis ouvert à toutes les idées et commentaires sur la façon dont je peux améliorer ma plateforme. Si vous avez des suggestions, n'hésitez pas à me les faire part. Je suis toujours en train de travailler pour offrir la meilleure expérience possible à mes utilisateurs.

Ce projet de market place d’NFT permet de valider ma troisieme année de bachelor en ingénierie de la blockchain a l’ESGI.

Enfin, je voudrais remercier toutes les personnes qui me soutiennent dans mon aventure. Je suis enthousiasmé par l'avenir de ce projet et j'ai hâte de vous y voir participer !

Merci encore d'avoir pris le temps de me lire et j'espère vous voir bientôt sur ma plateforme de marketplace d'NFT de l'automobile.

Cordialement,
Les créateurs de la marketplace d'NFT de l'automobile.

## POUR LANCER LE PROJET EN LOCALE

Dans un terminal, lancer la commande ci-dessous et entrer dans le dossier “MarketPlaceNFT-PA”:

```jsx
git clone https://github.com/Jonathan13127/MarketPlaceNFT-PA.git
```

### ⚠️ Penser a créer à la racine du projet un fichier .env :

| Variable | Valeur |
| --- | --- |
| IP | Serveur distant ou locale |
| PORTBDD | “port d’écoute de la bdd” |
| USERBDD | “utilisateur ayant les droits d’écritures et de lecture sur la table dans la bdd” |
| PASSWORD | “mot de passe de l’utilisateur” |
| DB | “table noSQL” |
| PORT | “port d’écoute de l’api” |
| JWT_SECRET | “clef privée rs256” |
| JWT_PUBLIC | “clef publique” |

### BASE DE DONNÉES:

Il faut créer une base de données noSQL sur un serveur MongoDB ⇒ puis une table ⇒ puis donner les droits d’écriture et de lecture a un utilisateur via mongosh.

```jsx
> use "latableenquestion"
 
> db.createUser(
{
user:"nomDuUser",
pwd:"mdpUser",
roles:[{role:"root",db:"nomDeLaTable"}]
})
```

PS: lors du devéloppement, MongoDB était conteneuriser dans docker…

### BACK-END:

Rentrer dans le dossier Back-end est lancer la commande:

```jsx
npm install && npm start
```

⚠️CORS:

A la racine du projet, dans le fichier “app.js”, il y a une constante “whiteList” qui est une liste contenant les origines d’où peuvent provenir les requêtes. Si les requêtes proviennent d’une origine différente l’api ne renverra rien. Assurez vous que la liste contient l’origine de votre client.

Pour tester l’api sans “Front”, ajouter dans la constante “http://{IP DE LA MACHINE}”

⚠️COOKIES:

Attention, les cookies seront dans la rubrique “Cookies” du navigateur. Si l’api et le front **ne sont pas déployer sur le même serveur,** alors les cookies ne seront pas reçu. Il faut rajouter **côté Back l’attribut “SameSite=None”,** attention, cette attribut augmenter les risque d’attaques CSRF

### FRONT-END:

## DOCUMENTATION API

| Méthode | Route | En-têtes | Paramètres | Body | Description |
| --- | --- | --- | --- | --- | --- |
| GET | /getUser/{username} | Autorization: {Token JWT} | username |  | Récupere les informations d’un utilisateur |
| GET | /validateToken | Autorization: {Token JWT} |  |  | Vérifie un token |
| GET | /me | Autorization: {Token JWT} |  |  | Récupere les information de l’utilisateur connecté |
| POST | /login |  |  | {”email:”XXX”,”password”:”X”} | Permet de se connecter |
| POST | /logout | Autorization: {Token JWT} |  |  | Permet de se déconnecter |
| POST | /register |  |  | {”username:”X”,”email:”XXXXX”,”password”:”X”} | Permet de s’inscrire |
| DELETE | /deleteAccount | Autorization: {Token JWT} |  |  | Permet de supprimer le compte de l’utilisateur |