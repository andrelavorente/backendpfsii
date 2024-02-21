import Usuario from '../Modelo/usuario.js';
import conectar from './conexao.js';

export default class UsuarioDAO {

    async gravar(usuario) {
        if (usuario instanceof Usuario) {
            const sql = `INSERT INTO usuario(usu_user,usu_pass,usu_dataCriacao,usu_dataAlteracao,codigo_perfil)
                VALUES(?,?,?,?,?)`;
            const parametros = [usuario.login, usuario.senha, usuario.dataCriacao,
            usuario.dataAlteracao,usuario.perfil];

            console.log(usuario.perfil);
            console.log(usuario.login);
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            usuario.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async atualizar(usuario) {
        if (usuario instanceof Usuario) {
            const sql = `UPDATE usuario SET usu_user = ?, usu_pass = ?,
            usu_dataCriacao = ?, usu_dataAlteracao = ?, codigo_perfil = ?
            WHERE usu_codigo = ?`;
            const parametros = [usuario.login, usuario.senha, usuario.dataCriacao,
                usuario.dataAlteracao,usuario.perfil,usuario.codigo];
            console.log(usuario.codigo);
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(usuario) {
        if (usuario instanceof Usuario) {
            const sql = `DELETE FROM usuario WHERE usu_codigo = ?`;
            const parametros = [usuario.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        if (!termo){
            termo="";
        }
        //termo é um número
        const conexao = await conectar();
        let listaUsuarios = [];
        if (!isNaN(parseInt(termo))){
            //consulta pelo código do produto
            const sql = `SELECT *
              FROM usuario u INNER JOIN perfil p ON u.codigo_perfil = p.per_codigo
              WHERE u.usu_codigo = ?
              ORDER BY u.usu_user               
            `;
            const parametros=[termo];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const usuario = new Usuario(registro.usu_codigo,registro.usu_user,
                                            registro.usu_pass,registro.usu_dataCriacao,
                                            registro.usu_dataAlteracao, registro.codigo_perfil
                                            );
                                            listaUsuarios.push(usuario);
            }
        }
        else
        {
            //consulta pela descrição do produto
            const sql = `SELECT *
              FROM usuario u INNER JOIN perfil p ON u.codigo_perfil = p.per_codigo
              WHERE u.usu_user like ?
              ORDER BY u.usu_user              
            `;
            const parametros=['%'+termo+'%'];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const usuario = new Usuario(registro.usu_codigo,registro.usu_user,
                                            registro.usu_pass,registro.usu_dataCriacao,
                                            registro.usu_dataAlteracao, registro.codigo_perfil
                                            );
                                            listaUsuarios.push(usuario);
            }
        }

        return listaUsuarios;
    }
}