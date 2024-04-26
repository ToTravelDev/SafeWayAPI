import express from "express";
import cors from 'cors';
const app = express();
import 'dotenv/config';
const port = process.env.APP_PORT

import usuarioRoutes from "./app/routes/usuario/index.js";

app.use(cors({ origin: true}));
app.use(express.json());
app.use('/usuario', usuarioRoutes);

app.listen(port,
    () => {
        console.log(`Servidor iniciado na porta ${port}`)
    })