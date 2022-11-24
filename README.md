# authentification-avancé-MERN-Stack


Créeation des instructions dans mon Dockerfile:(documentation)

-FROM  : Dans mon cas, je vais utiliser une image de base node;

-WORKDIR : j'ais Utilisé ensuite l'instruction WORKDIR qui permet de modifier le répertoire courant;

-RUN : qui me permet d’exécuter des commandes dans mon conteneur ;

-EXPOSE : qui permet de définir les ports d'écoute par défaut ;

-CMD : qui permet de définir la commande par défaut lors de l’exécution de vos conteneurs Docker.




J'ais Crée un network, et j'ais lui donné le nom de livraison-marhaba-net par la commande ( docker network create  livraison-marhaba-net .  )

J'ais executé un container basé sur l'image mongo, je l'ais nommé livraison-marhaba-db et je l'ais utilisé avec le network livraison-marhaba-net par la commande (docker container run -d --name livraison-marhaba-db -v livraison-marhaba-db:/data/db --network  livraison-marhaba-net mongo)

Dans le dossier du serveur où se trouver Dockerfile j'ais crée l'image sous nom de livraison-marhaba-docker:test et j'ai fais un build avec la commande (docker build -t livraison-marhaba-docker:test .   )

J'ai exécuté un container basé sur cette image que je vien  de créer, et je l'ais nommé livraison-marhaba et faites-le utiliser avec le network livraison-marhaba-net.(docker container run -d --name livraison-marhaba -v ${pwd}:/app -v /app/node_modules --network livraison-marhaba-net -p 80:80 livraison-marhaba-docker:test)


