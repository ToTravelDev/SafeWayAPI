const EscolaController = require("../../controller/escola/index.js");
const escola = new EscolaController();

module.exports = {
    async index(req, res)
    {
        let result = await escola.getIndexEscolas();
        res.json(result).status(200)
    },

    async store(req, res)
    {
        try{
            const id = req.params.id || undefined;
            escola.setParametros(req.params.id, req.body);
            let response = await escola.setInsertUpdate();
            res.json(response).status(201)
        }catch(error) {
            console.error(error)
            res.send("Internal server error").status(500);
        }
    },

    async findById(req, res)
    {
        try{
            const esId = req.params.id || undefined;
            if(typeof(esId) == 'undefined') {
                throw 'Id não informado'
            }

            let response = await escola.getEscolaById(esId)

            res.json(response).status(200)
            
        } catch(err) {
            console.error(err)
            res.send(err).status(500)
        }
    }
    
};