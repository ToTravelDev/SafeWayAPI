import { Router } from "express";
import UsuarioService from "./../../services/usuario/index.js";

export default class UsuarioRoutes
{
    router = Router()

    constructor()
    {
        this.initRoutes();
    }

    initRoutes()
    {
        this.router.get('/', UsuarioService.index )
    }
}