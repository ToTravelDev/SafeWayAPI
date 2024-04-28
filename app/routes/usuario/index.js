const express = require("express");
const UsuarioService = require("./../../services/usuario/index.js");

const UsuarioRoutes = express.Router();

UsuarioRoutes.get('/', UsuarioService.index)
UsuarioRoutes.post('/store', UsuarioService.store)

module.exports = UsuarioRoutes;