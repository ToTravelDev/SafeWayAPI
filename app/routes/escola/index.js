const express = require("express");
const EscolaService = require("./../../services/escola/index.js");

const EscolaRoutes = express.Router();

EscolaRoutes.get('/', EscolaService.index)
EscolaRoutes.get('/:id', EscolaService.findById)
EscolaRoutes.post('/store', EscolaService.store)
EscolaRoutes.put('/update/:id', EscolaService.store) // Recebe o parâmetro de url id e chama a função store

module.exports = EscolaRoutes;