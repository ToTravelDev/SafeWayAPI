const db = require("../database/connection");

class UsuarioModel
{
    usu_id = undefined;
    usu_nome;
    usu_cpf;
    usu_cidade;
    usu_uf;
    tp_usu;
    usuarioLogin;
    usuarioEndereco;

    async save()
    {
        let response;

        if(!(typeof(this.usu_id) == 'undefined')) {
            response = await this.#update();
        } else {
            response = await this.#insert();
        }

        return response;
    }

    async #update()
    {
        const sqlUsuario = `UPDATE usuario SET usu_nome = $1, usu_cpf = $2, usu_cidade = $3, usu_uf = $4, tp_usu = $5 WHERE usu_id = $6 `;
        const valuesUsuario = [this.usu_nome, this.usu_cpf, this.usu_cidade, this.usu_uf, this.tp_usu, this.usu_id]

        const sqlEndereco = `UPDATE usuario_endereco SET usu_end_rua = $1, usu_end_numero = $2, usu_end_complemento = $3, usu_end_cep = $4 WHERE usu_id = $5 `
        const valuesEndereco = [this.usuarioEndereco.rua, this.usuarioEndereco.numero, this.usuarioEndereco.complemento, this.usuarioEndereco.cep, this.usu_id]

        const sqlLogin = `UPDATE usuario_login SET usu_log_email = $1, usu_log_senha = $2, usu_log_sso = $3 WHERE usu_id = $4`;
        const valuesLogin = [this.usuarioLogin.usu_log_email, this.usuarioLogin.usu_log_senha, this.usuarioLogin.usu_log_sso, this.usu_id]

        try{
            await db.query("BEGIN");

            await db.query(sqlUsuario, valuesUsuario) // atualização da tabela usuario
            await db.query(sqlEndereco, valuesEndereco) // atualização da tabela usuario
            await db.query(sqlLogin, valuesLogin) // atualização da tabela usuario

            await db.query('COMMIT');
            
        } catch(err) {
            await db.query('ROLLBACK');
            throw new Error(err)
        }


    }

    async #insert()
    {
        try{
            await db.query('BEGIN') //inicia transaction
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
            
            let valuesLogin = [this.usuarioLogin.usu_log_email, this.usuarioLogin.usu_log_senha, '1', usu_id];
            await db.query(sqlLogin, valuesLogin)

            // Inserção de endereço
            let sqlEndereco = `INSERT INTO usuario_endereco
                (usu_id, usu_end_rua, usu_end_numero, usu_end_complemento, usu_end_cep)
                VALUES
                ($1, $2, $3, $4, $5)`;
            let valuesEndereco = [usu_id, this.usuarioEndereco.rua, this.usuarioEndereco.numero, this.usuarioEndereco.complemento, this.usuarioEndereco.cep]

            await db.query(sqlEndereco, valuesEndereco);
            await db.query('COMMIT') //Finaliza transaction

            return {"usu_id": usu_id}
        } catch (err) {
            await db.query('ROLLBACK') //inicia transaction
            throw new Error(err);
        }
    }

    async findAll()
    {
        let sql = `SELECT ul.usu_log_email, usu.*, ue.*, tp.tp_desc AS usuario_tipo FROM usuario as usu
        LEFT JOIN usuario_endereco AS ue ON ue.usu_id = usu.usu_id
        LEFT JOIN usuario_login AS ul ON ul.usu_id = usu.usu_id
        LEFT JOIN tipo_usuario AS tp ON tp.tp_id = usu.tp_usu`;

        let result = await db.query(sql);
        return result.rows;
    }

    async instanceUsuario(id)
    {
        try{
            const result = await db.query(`SELECT ul.usu_log_email, ul.usu_log_senha, ul.usu_log_sso, usu.*, ue.* FROM usuario as usu
            LEFT JOIN usuario_endereco AS ue ON ue.usu_id = usu.usu_id
            LEFT JOIN usuario_login AS ul ON ul.usu_id = usu.usu_id
            LEFT JOIN tipo_usuario AS tp ON tp.tp_id = usu.tp_usu
            WHERE usu.usu_id = $1`, [id]);

            var fetchUsuario = result.rows[0];
            fetchUsuario.usuarioEndereco = {}
            fetchUsuario.usuarioLogin = {}
            
            Object.keys(fetchUsuario).forEach((key, index) => {
                if(key == 'usu_end_id' || key == 'usu_end_rua' || key == 'usu_end_numero' || key == 'usu_end_complemento' || key == 'usu_end_cep') {
                    fetchUsuario.usuarioEndereco[key] = fetchUsuario[key]
                    delete fetchUsuario[key];
                }

                if(key == 'usu_log_email' || key == 'usu_log_senha' || key == 'usu_log_sso') {
                    fetchUsuario.usuarioLogin[key] = fetchUsuario[key]
                    delete fetchUsuario[key];
                }
            })
            
            // atribui os dados carregados ao objeto usuário 
            let usuario = new UsuarioModel();
            Object.assign(usuario, fetchUsuario);
            return usuario;
        } catch(err){
            console.error("Não encontrado")
            throw new Error("Usuário não encontrado")
        }
    }

}

module.exports = UsuarioModel;