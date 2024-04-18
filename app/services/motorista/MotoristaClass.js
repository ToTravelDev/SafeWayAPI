import MotoristaModel from "../../model/MotoristaModel.js"
const model = new MotoristaModel();
class Motorista
{

    async findAll()
    {
        return await model.getAll()
    }
    
    async insert(data)
    {
        // TODO: Tratar dados e inserir novo registro
        this.#setData(data.motorista);
        let msg = await this.#save();
        return msg;
    }

    #setData(dados) 
    {
        if (dados.mot_id){
            this.mot_id = dados.mot_id;
        }
        this.cadastro = {
            mot_nome: this.#validaNome(dados.mot_nome),
            mot_cpf: this.#validaCPF(dados.mot_documento),
            mot_cidade: dados.mot_cidade,
            mot_uf: dados.mot_uf,
            mot_cnh: this.#validaCNH(dados.mot_cnh)
        };

        this.endereco = {
            logradouro: this.#limpaString(dados.motoristaEndereco.logradouro),
            cep: this.#validaCep(dados.motoristaEndereco.cep),
            numero: dados.motoristaEndereco.numero,
            complemento: dados.motoristaEndereco.complemento
        }
    }

    async #save()
    {
        if(this.mot_id) {
            return "Update do id: " + mot_id
        } else {
            try{
                // inserção
                const res = await model.save({"cadastro": this.cadastro, "endereco": this.endereco});

                return {"message": res.command, res};
            }catch(err){
                console.error(err)
                return (err)
            }
        }
    }

    #validaNome(nome) 
    {
        if(nome != undefined)
            return nome.replace(/^\s+|\s+$/gm,'')
    }

    #validaCPF(cpf)
    {
        if(cpf != undefined)
            return cpf.replace(/\.+|\-/g, "").replace(/^\s+|\s+$/gm,'')
    }

    #validaCNH(cnh)
    {
        if(cnh != undefined)
            return cnh.replace("/\-/\./\//g", "").replace(/^\s+|\s+$/gm,'')
    }

    #limpaString(str)
    {
        return str.replace(/^\s+|\s+$/gm,'')
    }

    #validaCep(cep)
    {
        if(cep != undefined)
            return cep.replace(/^\s+|\s+$/gm,'').replace(/\.+|\-/g, "")
    }
}

export default Motorista