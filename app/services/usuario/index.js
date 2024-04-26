import UsuarioController from "../../controller/usuario/index.js";

export default class UsuarioService extends UsuarioController
{
    index(req, res)
    {
        res.status(200).json(this.getIndexUsers());
    }
}