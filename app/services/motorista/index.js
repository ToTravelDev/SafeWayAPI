import Motorista from "./../../services/motorista/MotoristaClass.js";
import MotoristaModel from "./../../model/MotoristaModel.js";
const model = new MotoristaModel()

class MotoristaService extends Motorista
{
    /**
     * Serviço de listagem de motoristas
     */
    async index(req, res) {
        const result = await model.getAll()
        
        res.json(result.rows);
    }

    /**
     * Serviço de inserção / atualização de motoristas
     * @param {} req 
     * @param {} res 
     */
    async store(req, res) {
        try {
            if(!req.params.id){ // => se NÃO for enviado o id, será realizada a inserção do motorista
                const response = Motorista.insert(req.body)
                res.status(201).json(response)
            } else {
                res.send(`Atualização do motorista id: ${req.params.id}`)
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async getById(req, res){
        res.send(`Retornando dados do motorista:  id = ${req.params.id}`)
    }
}

export default MotoristaService;