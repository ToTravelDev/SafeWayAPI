import express from "express";
import MotoristaService from "./../../services/motorista/index.js";
const service = new MotoristaService()

const motoristaRoutes = express.Router();

motoristaRoutes.get('/index', service.index)

motoristaRoutes.post('/store(/:id)?', service.store)

motoristaRoutes.get("/:id", service.getById)

export default motoristaRoutes;