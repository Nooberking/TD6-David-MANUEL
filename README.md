# TD 6 Mise en production : Déploiement partiel de l'application de vaccination covid.

~~~~
~~~~

## Introduction : 

L'objectif ici est de déployer notre application web de pris de rendez-vous pour la vaccination covid. **Pour ce déploiement, nous prenons uniquement la partie publique, permettant d'effectuer une réservation client.**

Notre application est divisé en trois parties :  **la base de données** en PostgresSQL, **l'API** en Java spring et **le front** en Angular.

La base de données sera déployée sur Mogenius. L'api et le front quant à elles seront déployés dans des conteneur docker locaux.

##  Prérequis : 

Pour effectuer ce déploiement jusqu'au bout, il faudra avoir installé **Docker** et posséder un compte gratuit sur **mogenius** : https://mogenius.com/home.

De plus; il vous faudra git et cloner le dépôt suivant : https://github.com/Nooberking/TD6-David-MANUEL.git

## Partie 1 : Base de données

Nous allons déployer la base de données sur mogenius. pour se faire, accédez à mogenius et authentifiez-vous.

Une fois ceci fait créez un nouvel cloudspace 

Ensuite dans ce cloudspace, sélectionnez **add a service** et prennez l'option **deploy a repository with a Dockerfile**. Vous vous retrouverez alors dans le menu suivant : 

<img src=".\images\image-20221203084724007.png" alt="image-20221203084724007" style="zoom:50%;" />

Choississez que vous voulez en tant que Service name.

Pour la section **Repository**, choississez la section **public**. rentrez le lien vers le dépot github dans **git repository**. choisissez la branche **deploy** et pour le **Dockerfile name**, saississez ``` ./covid-bdd/Dockerfile``` 

Dans la section **Ressource limits**, procédez comme le montre l'image suivante : 

<img src=".\images\image-20221203085750974.png" alt="image-20221203085750974" style="zoom:80%;" />

Dans la section **Environnment variables**, ajoutez 2 variables : 

- **POSTGRES_USER** en plain text avec le nom d'utilisateur que vous souhaitez.
- **POSTGRES_PASSWORD** en key vault pour le mot de passe que vous souhaitez. Vous pouvez créer un nouneau secret en cliquant sur le bouton en dessous d champ *create new secret*.

<img src=".\images\image-20221203090318890.png" alt="image-20221203090318890" style="zoom:80%;" />

Pour la section **ports**, ajoutez le port **5432** en **TCP** et vérifiez que la case **Expose** soit bien cochée. 

<img src=".\images\image-20221203090645362.png" alt="image-20221203090645362" style="zoom:80%;" />

Et vous pouvez donc créer le service.

# Partie 2 : Back + Front

Nous allons maintenant deployer le Back et le Front dans des conteneurs locaux qui communiqueront avec la BDD distante. 

Pour se faire, allez dans votre copie locale du repos git, dans la branche **deploy**.

 Allez ensuite dans **\covid-api\src\main\resources\application.yaml**.

Il vous faudra alors **modifier le username et le password par ceux que vous avez choisi.**

il faut aussi modifier **l'url** :

- retournez sur **mogenius** et cliquez sur le service que vous avez créé.

- récupérez **l'external hostname** comme dans l'image suivante :

  <img src=".\images\image-20221203091610141.png" alt="image-20221203091610141" style="zoom:80%;" />

- dans la section **url** de l'application.yaml, remplacez par : **jdbc:postgresql://<l'external hostname>/covid-db**

<img src=".\images\image-20221203091823388.png" alt="image-20221203091823388" style="zoom:80%;" />

Une fois ceci fait, allez dans **\covid-api\src\main\resources\db\changelog\db.changelo-master.yaml** et changez **l'username** par celui que vous aviez préalablement choisi.

<img src=".\images\image-20221203092119392.png" alt="image-20221203092119392" style="zoom:80%;" />

Ouvrez maintenant un invite de commande à la racine de votre copie locale et lancez la commande **docker compose up** : 

<img src=".\images\image-20221203092314507.png" alt="image-20221203092314507" style="zoom:80%;" />

Et voila le tout lancé ! 

**NOTE : ** Le back peut mettre un moment à se lancer entièrement la première fois à cause de l'importation de tous les centres.



# Partie 3 : Tests



Pour tester le tout vous pouvez : 

- Pour la BDD, **utiliser pgAdmin** puis créer un server avec l'external hostname et les identifants que vous avez renseigné.
- Pour le back, vous pouvez accéder à ce workspace Postman https://app.getpostman.com/join-team?invite_code=b8b8fe82e64d00199c12e6745a9cd6b1&target_code=67f56467f33e7458d0eee66fbbeb78f2 et tester les requêtes depuis 5A-PFS-TD/API/public 
- Pour le front : accédez à l'adresse http://localhost:4200

**Note : ** Pour une raison inconnue, le front n'arrive pas à interpréter les réponses du back, causant des erreurs de communications entre eux. 
