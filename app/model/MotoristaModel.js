import db from "./../database/connection.js";

class MotoristaModel
{
    getAll()
    {
        return db.query("select * from motorista");
    }

    async save(data)
    {
        try{
            //consulta de cpf
            const res = await db.query("select * from motorista where mot_cpf = $1", [data.cadastro.mot_cpf]);
            const dadosMotorista = res.rows[0];

            if(dadosMotorista == undefined){ // inserção caso não encontre
                var query = await db.query("insert into motorista(mot_nome, mot_cpf, mot_cidade, mot_uf) VALUES($1, $2, $3, $4)", [
                    data.cadastro.mot_nome,
                    data.cadastro.mot_cpf,
                    data.cadastro.mot_cidade,
                    data.cadastro.mot_uf
                ]);
            } else { // ataulização caso encontre
                let dadosCadastro = {
                    mot_nome: data.cadastro.mot_nome == undefined ? dadosMotorista.mot_nome : data.cadastro.mot_nome,
                    mot_cpf: data.cadastro.mot_cpf == undefined ? dadosMotorista.mot_cpf : data.cadastro.mot_cpf,
                    mot_cidade: data.cadastro.mot_cidade == undefined ? dadosMotorista.mot_cidade : data.cadastro.mot_cidade,
                    mot_uf: data.cadastro.mot_uf == undefined ? dadosMotorista.mot_uf : data.cadastro.mot_uf,
                    mot_id: dadosMotorista.mot_id
                }

                var query = await db.query("update motorista set mot_nome = $1, mot_cpf = $2, mot_cidade = $3, mot_uf = $4 WHERE mot_id = $5", [
                    dadosCadastro.mot_nome,
                    dadosCadastro.mot_cpf,
                    dadosCadastro.mot_cidade,
                    dadosCadastro.mot_uf,
                    dadosCadastro.mot_id
                ])
            }
            return query;

        } catch(err){
            console.error(err)
            return (err)
        }
    }
}

export default MotoristaModel;