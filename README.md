# authentification-avancé-MERN-Stack

1-DOCKER

Premiere etape 1 : L'instalation de  <a href="https://www.docker.com">Docker</a> sur Windows.

Deusieme étape 2 :** L'instalation de  <a href="https://www.microsoft.com/store/productId/9P9TQF7MRM4R">Wsl 2</a> par  Microsoft Store.

Troisieme étape 3 :** L'instalation de  <a href="https://www.microsoft.com/store/productId/9PDXGNCFSCZV">Ubuntu</a> par  Microsoft Store.


**<-- Les étapes pour back-end -->**

1**Créer un Dockerfile.**


 Dockerfile est un fichier qui liste les instructions à exécuter pour build une image. Il est lu de haut en bas au cours du processus de build.

        FROM node:16
        WORKDIR /app
        COPY package.json .
        RUN npm install
        COPY . ./
        EXPOSE 9000
        CMD ["npm", "start"]
    
2** Créer un network, et lui donner le nom de livraison-marhaba-back-end-net.

    docker network create livraison-marhaba-back-end-net

3**Étape :** Executez un container basé sur l'image mongo, nommez-le livraison-marhaba-back-end-db et faites-le utiliser avec le network livraison-marhaba-back-end-net.

    docker container run -d --name livraison-marhaba-back-end-db -v livraison-marhaba-back-end-db:/data/db --network livraison-marhaba-back-end-net mongo

4**Étape :** Entrer dans le dossier du serveur où se trouver Dockerfile et creer cette image et nommez-la livraison-marhaba-back-end-docker:test et faire un build.

    docker build -t livraison-marhaba-back-end-docker:test .

5**Étape :** Exécutez un container basé sur cette image que vous venez de créer, nommez-le livraison-marhaba-back-end et faites-le utiliser avec le network livraison-marhaba-back-end-net.

    docker container run -d --name livraison-marhaba-back-end -v ${pwd}:/app -v /app/node_modules --network livraison-marhaba-back-end-net -p 9000:9000 livraison-marhaba-back-end-docker:test
    

**<-- Les étapes pour front-end -->**

*1 :** Créer un Dockerfile.

        FROM node:16
        WORKDIR /views
        COPY package.json .
        RUN npm install
        COPY . ./
        EXPOSE 3000
        CMD ["npm", "start"]

*2 :** Créer un network, et lui donner le nom de livraison-marhaba-front-end-net.

    docker network create livraison-marhaba-front-end-net

*3 :** Entrer dans le dossier du serveur où se trouver Dockerfile et creer cette image et nommez-la livraison-marhaba-front-end-docker:test et faire un build.

    docker build -t livraison-marhaba-front-end-docker:test .

*4 :** Exécutez un container basé sur cette image que vous venez de créer, nommez-le livraison-marhabafront-end- et faites-le utiliser avec le network livraison-marhabafront-end--net.
    
    docker container run -d --name livraison-marhaba-front-end- -v ${pwd}:/app -v /app/node_modules --network livraison-marhaba-front-end-net -p 3000:3000 livraison-marhaba-front-end-docker:test


*****|------------------------ Testing ------------------------|*****

**Étape 1 :** Installer la bibliothèque jest et supertest

    npm i --save-dev jest supertest

**Étape 2 :** Créer un tests.test.js
    
1-  Exiger supertest et index.js

        const request = require('supertest');
        const app = require('./index');

2-  Créer la fonction describe(name, fn)

    describe("POST /api/auth/login", () => {
    let body = {
        email: "",
        password: ""
    }
    
    describe("Check your email to active your account", () => {
        test("Check your email to active your account", async () => {
            body = {
                email: "fauxEmail",
                password: "fauxPwd"
            }
            const response = await request(app).post("/api/auth/login").send(body)
            expect(response.text).toBe('Check your email to active your account')
        })
    })

    describe("Email or password is incorect", () => {
        test("Email or password is incorect", async () => {
            body = {
                email: "wlahlali343@gmail.com",
                password: "123456"
            }
            const response = await request(app).post("/api/auth/login").send(body)
            expect(response.text).toBe('Email or password is incorect')
        })
    })

    describe("Fill the all fields to login", () => {
        test("Fill the all fields to login", async () => {
            body = {
                email: "",
                password: ""
            }
            const response = await request(app).post("/api/auth/login").send(body)
            expect(response.text).toBe('Fill the all fields to login')
        })
    })
})

3- A l'iterier de la fonction describe, crée trois test.
    
**Étape 3 :** Enfin, exécutez le test.

    npm test
    
