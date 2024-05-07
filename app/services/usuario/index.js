const UsuarioController = require("../../controller/usuario/index.js");
const usuarioController = new UsuarioController();

module.exports = {
    async index(req, res)
    {
        
        let result = await usuarioController.getIndexUsers();
        res.json(result).status(200);
    },

    async store(req, res)
    {
        try{
            const id = req.params.id || undefined;
            usuarioController.setParametros(req.params.id, req.body);
            let response = await usuarioController.setInsertUpdate();
            res.json(response)
        }catch(error){
            console.error(error)
            res.send('Internal server error').status(500);
        }
    },

    async findById(req, res)
    {
        try{
            const usuId = req.params.id || undefined;
            if(typeof(usuId) == 'undefined') {
                throw 'Id não informado'
            }

            let response = await usuarioController.getUserById(usuId)

            res.json(usuId).status(200)
            
        } catch(err) {
            console.error(err)
            res.send(err).status(500)
        }
    }
}