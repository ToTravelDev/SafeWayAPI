import express from "express";
import cors from 'cors';
const app = express();
import 'dotenv/config';
const port = process.env.APP_PORT

import motoristaRoutes from "./app/routes/motorista/index.js";

app.use(cors({ origin: true}));
app.use(express.json());
app.use("/motorista", motoristaRoutes);

app.listen(port,
    () => {
        console.log(`Servidor iniciado na porta ${port}`)
    })