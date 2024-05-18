const BaseController = require("./../BaseController.js");
const Escola = require('./../../model/Escola.js');
class EscolaController extends BaseController
{
    async getIndexEscolas()
    {
        let escola = new Escola();
        const result = await escola.findAll();
        return result;
    }

    async setInsertUpdate()
    {
        try{
            let escola = undefined

            if(typeof(this.id) != 'undefined') {
                escola = await new Escola().instanceEscola(this.id);
            } else {
                escola = new Escola()
            }

            // => definindo parâmetros de cadastro de escola

            escola.es_desc = this.params.es_desc || escola.es_desc
            escola.es_ativo = this.params.es_ativo || escola.es_ativo
            escola.es_cep = this.params.es_cep || escola.es_cep
            escola.es_rua = this.params.es_rua || escola.es_rua
            escola.es_numero = this.params.es_numero || escola.es_numero
            escola.es_complemento = this.params.es_complemento || escola.es_complemento

            console.log(escola)
            let response = escola.save()

            return response;

        } catch(error) {
            console.error(error)
            throw ''
        }
    }

    async getEscolaById(id)
    {
        const escola = new Escola();
        const result = await escola.findById(id);

        return result;
    }
}

module.exports = EscolaController;