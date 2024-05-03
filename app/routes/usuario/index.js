const express = require("express");
const UsuarioService = require("./../../services/usuario/index.js");

const UsuarioRoutes = express.Router();

UsuarioRoutes.get('/', UsuarioService.index)
UsuarioRoutes.post('/store', UsuarioService.store)
UsuarioRoutes.put('/update/:id', UsuarioService.store) // Recebe o parâmetro de url id e chama a função store

module.exports = UsuarioRoutes;