# Mapa de Bairro
Esse projeto foi criado em React utilizando a ferramenta [Create React App](https://github.com/facebook/create-react-app) com o objetivo de aplicar algumas tecnologias front-end no desenvolvimento de aplicações para web.

## Como utilizar?
Para utilizar esse projeto, você deve clonar este repositório em sua máquina e instalar as dependências:
1. Instale o [Node.JS](https://nodejs.org/en/download/) e o [NPM](https://www.npmjs.com/get-npm) no seu computador;
2. Dentro da pasta, abra o prompt de comando (ou o terminal) e digite o comando `npm install` para instalar as dependências;
3. E `npm start` para iniciar o servidor local em http://localhost:3000.

## Modo de produção
1. Através do comando `npm run build`, será criado a pasta [/build](build/) com o projeto compilado.
2. Após isso, digite o comando `npm run deploy` para iniciar no github pages.
3. Verifique o resultado aqui => [Mapa do Bairro](https://oseiasal.github.io/mapa-do-bairro/)

**Obs.:**  
1. Dessa maneira, o **serviceWorker** será adicionado ao projeto para o armazenamento em cache.

2. Pode ser necessário editar o arquivo [package.json](package.json):
    -   ``"homepage": "http://[user].github.io/mapa-do-bairro"``
    -    ```"predeploy": "npm run build",
        "deploy": "gh-pages -d build"```

## Inserção de novos locais

Para inserir novos lugares no mapa, basta abrir o arquivo [location.js](src/data/locations.js) e inserir as informações em `Places`

## Referências

Para aprender sobre React:
- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
- [React documentation](https://reactjs.org/).

Mais informações:
- [Udacity - Front End Avançado](https://br.udacity.com/course/front-end-web-developer-nanodegree--nd001-br-advanced)

### Licensas
Você está autorizado a utilizar este projeto para fins de estudos.
