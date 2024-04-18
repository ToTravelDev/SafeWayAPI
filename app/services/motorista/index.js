import Motorista from "./../../services/motorista/MotoristaClass.js";
const controller = new Motorista();
class MotoristaService extends Motorista
{
    /**
     * Serviço de listagem de motoristas
     */
    async index(req, res) {
        const result = await controller.getAll()
        
        res.json(result.rows);
    }

    /**
     * Serviço de inserção / atualização de motoristas
     * @param {} req 
     * @param {} res 
     */
    async store(req, res) {
        if(!req.params.id){ // => se NÃO for enviado o id, será realizada a inserção do motorista
            const response = await controller.insert(req.body)
            res.status(201).json(response)
        } else {
            res.send(`Atualização do motorista id: ${req.params.id}`)
        }
    }

    async getById(req, res){
        res.send(`Retornando dados do motorista:  id = ${req.params.id}`)
    }
}

export default MotoristaService;