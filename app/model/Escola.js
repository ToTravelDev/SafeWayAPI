const db = require("../database/connection");

class EscolaModel
{
    es_id = undefined;
    es_desc;
    es_ativo;
    es_cep;
    es_rua;
    es_numero;
    es_complemento;

    async save()
    {
        let response;

        if(!(typeof(this.es_id) == 'undefined')) {
            response = await this.#update();
        } else {
            response = await this.#insert();
        }

        return response;
    }

    async #update()
    {
        const sql = `UPDATE escola SET
        es_desc = $1, es_ativo = $2, es_cep = $3, es_rua = $4, es_numero = $5, es_complemento = $6
        WHERE es_id = $7
        RETURNING *`;

        const values = [this.es_desc, this.es_ativo, this.es_cep, this.es_rua, this.es_numero, this.es_complemento, this.es_id]

        try{
            await db.query("BEGIN");

            const response = await db.query(sql, values);
            
            await db.query("COMMIT");

            return response.rows[0];

        }catch(error) {
            await db.query('ROLLBACK');
            throw new Error(err)
        }
    }

    async #insert()
    {
        try{
            await db.query("BEGIN")

            const sql = `INSERT INTO escola
                (es_desc, es_ativo, es_cep, es_rua, es_numero, es_complemento) 
                VALUES 
                ($1, $2, $3, $4, $5, $6)
                RETURNING *`;

            const values = [this.es_desc, this.es_ativo, this.es_cep, this.es_rua, this.es_numero, this.es_complemento]
            const result = await db.query(sql, values);

            let res = result.rows[0];
            await db.query("COMMIT")

            return res
        } catch(error) {
            await db.query('ROLLBACK');
            throw new Error(err)
        }
    }

    async findAll()
    {
        let sql = `SELECT * from escola`;

        let result = await db.query(sql);
        return result.rows;
    }

    async findById(id)
    {
        let sql = `SELECT * FROM escola WHERE es_id = $1`;

        let result = await db.query(sql, [id]);
        return result.rows[0];
    }


    async instanceEscola(id)
    {
        try{
            const result = await db.query(`SELECT * FROM escola WHERE es_id = $1`, [id]);

            var fetchEscola = result.rows[0];
            
            // atribui os dados carregados ao objeto escola
            let escola = new EscolaModel();
            Object.assign(escola, fetchEscola);
            return escola;
        } catch(err){
            console.error("Não encontrado")
            throw new Error("Escola não encontrada")
        }
    }
}

module.exports = EscolaModel