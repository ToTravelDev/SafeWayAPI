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

        let sqlEndereco = `INSERT INTO usuario_endereco
            (usu_id, usu_end_rua, usu_end_numero, usu_end_complemento, usu_end_cep)
            VALUES
            ($1, $2, $3, $4, $5)`;
        let valuesEndereco = [usu_id, this.usuarioEndereco.rua, this.usuarioEndereco.numero, this.usuarioEndereco.complemento, this.usuarioEndereco.cep]

        await db.query(sqlEndereco, valuesEndereco);
        
        return {"usu_id": usu_id}
    }

    async findAll()
    {
        let sql = `SELECT ul.usu_log_email, usu.*, ue.*, tp.tp.desc AS tipo_usuario FROM usuario 
        INNER JOIN usuario_endereco AS ue ON ue.usu_id = usu.usu_id
        INNER JOIN usuario_login AS ul ON ul.usu_id = usu.usu_id
        LEFT JOIN tp_usu AS tp ON tp.tp_id = usu.tp_id`;

        let result = await db.query(sql);
        return result.rows;
    }

}

module.exports = UsuarioModel;