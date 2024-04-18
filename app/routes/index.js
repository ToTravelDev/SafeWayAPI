import express from 'express';
const routes = express.Router();
import motoristaRoutes from "./motorista/index.js"

// => Carrega as rotas do motorista
routes.use("/motorista", motoristaRoutes);

export default routes;