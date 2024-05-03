const BaseController = require("./../BaseController.js");
const Usuario = require('./../../model/Usuario.js');
class UsuarioController extends BaseController
{
    async getIndexUsers()
    {
        const usuario = new Usuario();
        const result = await usuario.findAll();
        return result
    }

    async setInsertUpdate()
    {
        try{
            let usuario = undefined;
            // caso haja o id do usuário, busca pelo id no sistema
            if(typeof(this.usu_id) != 'undefined') {
                usuario = await new Usuario().instanceUsuario(this.usu_id);
            } else {
                usuario = new Usuario();
            }

            // mapeamento = (parâmetro possível enviado por JSON) || (parametro armazenado em banco de dados - CASO EXISTA REGISTRO)

            usuario.usu_nome = this.params.usu_nome || usuario.usu_nome;
            usuario.usu_cpf = this.params.usu_cpf || usuario.usu_cpf;
            usuario.usu_cidade = this.params.usu_cidade || usuario.usu_cidade;
            usuario.usu_uf = this.params.usu_uf || usuario.usu_uf;
            usuario.tp_usu = this.params.tp_usu || usuario.tp_usu;

            // definindo parametros de login
            if(this.params.login){
                if(typeof(usuario.usu_id) == 'undefined') // se não encontrar o id do usuário, cria um objeto vazio
                    usuario.usuarioLogin = {}
                usuario.usuarioLogin.usu_log_email = this.params.login.email || usuario.usuarioLogin.usu_log_email
                usuario.usuarioLogin.usu_log_senha = this.params.login.senha || usuario.usuarioLogin.usu_log_senha
            }

            // definindo parametros de endereço
            if(this.params.usuarioEndereco){
                if(typeof(usuario.usu_id) == 'undefined') // se não encontrar o id do usuário, cria um objeto vazio
                    usuario.usuarioEndereco = {}
                usuario.usuarioEndereco.cep = this.params.usuarioEndereco.cep || usuario.usuarioEndereco.usu_end_cep
                usuario.usuarioEndereco.cep.replace(/\.|-/g, "")
                usuario.usuarioEndereco.rua = this.params.usuarioEndereco.rua || usuario.usuarioEndereco.usu_end_rua
                usuario.usuarioEndereco.numero = this.params.usuarioEndereco.numero || usuario.usuarioEndereco.usu_end_numero
                usuario.usuarioEndereco.complemento = this.params.usuarioEndereco.complemento || usuario.usuarioEndereco.usu_end_complemento
            }

            console.log(usuario)
            let response = await usuario.save();
            
            return response;

        } catch(err) {
            console.log("[ERRO] - ao tentar inserir/atualizar usuário, " + err)
            throw '';
        }
    }
}

module.exports = UsuarioController;