// Importação do módulo Express e do arquivo de rotas
const express = require("express");
const routes = require("../routes");

// Inicialização da aplicação Express
const app = express();

// Middleware para permitir o uso de JSON nas requisições
app.use(express.json());

// Utilização das rotas definidas no arquivo routes.js
app.use(routes);

// Exportação do objeto 'app' para ser utilizado em outros arquivos
module.exports = { app };
