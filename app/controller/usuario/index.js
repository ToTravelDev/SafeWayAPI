const BaseController = require("./../BaseController.js");
const Usuario = require('./../../model/Usuario.js');
class UsuarioController extends BaseController
{
    getIndexUsers()
    {
        const usuario = new Usuario();
        return usuario.findAll();
    }

    async setInsertUpdate()
    {
        try{
            const usuario = new Usuario();
            usuario.usu_id = this.usu_id;
            usuario.usu_nome = this.params.usu_nome;
            usuario.usu_cpf = this.params.usu_cpf;
            usuario.usu_cidade = this.params.usu_cidade;
            usuario.usu_uf = this.params.usu_uf;
            usuario.tp_usu = this.params.tp_usu;

            // definindo parametros de login
            usuario.usuarioLogin = {}
            usuario.usuarioLogin.usu_email = this.params.login.email
            usuario.usuarioLogin.usu_senha = this.params.login.senha

            // definindo parametros de endereço
            usuario.usuarioEndereco = {}
            usuario.usuarioEndereco.cep = this.params.usuarioEndereco.cep
            usuario.usuarioEndereco.rua = this.params.usuarioEndereco.rua
            usuario.usuarioEndereco.numero = this.params.usuarioEndereco.numero
            usuario.usuarioEndereco.complemento = this.params.usuarioEndereco.complemento

            let response = await usuario.save();
            
            return response;

        } catch(err) {
            console.log("[ERRO] - ao tentar inserir usuário, " + err)
            throw '';
        }
    }
}

module.exports = UsuarioController;