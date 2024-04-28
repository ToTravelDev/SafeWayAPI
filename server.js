const express = require("express");
const cors = require('cors');

const app = express();
require('dotenv').config()
const port = process.env.APP_PORT

const UsuarioRoutes = require("./app/routes/usuario/index.js")

app.use(cors({ origin: true}));
app.use(express.json());
app.use('/usuario', UsuarioRoutes);

app.listen(port,
    () => {
        console.log(`Servidor iniciado na porta ${port}`)
    })