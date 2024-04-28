const db = require("../database/connection");

class UsuarioModel
{
    usu_id = undefined;
    usu_nome;
    usu_cpf;
    usu_cidade;
    usu_uf;
    tp_usu;

    async save()
    {
        let response;
        if(!typeof(usu_id) == 'undefined') {
            response = await this.#update();
        } else {
            response = await this.#insert();
        }

        return response;
    }

    async #update()
    {

    }

    async #insert()
    {
        let sql = `INSERT INTO usuario 
            (usu_nome, usu_cpf, usu_cidade, usu_uf, tp_usu) 
            VALUES
            ($1, $2, $3, $4, $5)
            RETURNING *`;
        
        let values = [this.usu_nome, this.usu_cpf, this.usu_cidade, this.usu_uf, this.tp_usu];
        let result = await db.query(sql, values)

        const usu_id = result.rows[0].usu_id;

        // inserção de login
        let sqlLogin = `INSERT INTO usuario_login
            (usu_log_email, usu_log_senha, usu_log_sso, usu_id) 
            VALUES
            ($1, $2, $3, $4)`;
        
        let valuesLogin = [this.usuarioLogin.usu_email, this.usuarioLogin.usu_senha, '1', usu_id];
        await db.query(sqlLogin, valuesLogin)
        
        return {"usu_id": usu_id}
    }

}

module.exports = UsuarioModel;