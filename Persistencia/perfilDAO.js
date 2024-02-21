import Perfil from "../Modelo/perfil.js";
import conectar from "./conexao.js";

export default class PerfilDAO{
    async gravar(perfil){
        if (perfil instanceof Perfil){
            const sql = "INSERT INTO perfil(per_nome) VALUES(?)"; 
            const parametros = [perfil.nome];
            const conexao = await conectar(); 
            const retorno = await conexao.execute(sql,parametros); 
            perfil.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(perfil){
        if (perfil instanceof Perfil){
            const sql = "UPDATE perfil SET per_nome = ? WHERE per_codigo = ?"; 
            const parametros = [perfil.nome, perfil.codigo];
            const conexao = await conectar(); 
            await conexao.execute(sql,parametros); 
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(perfil){
        if (perfil instanceof Perfil){
            const sql = "DELETE FROM perfil WHERE per_codigo = ?"; 
            const parametros = [perfil.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];
        //é um número inteiro?
        if (!isNaN(parseInt(parametroConsulta))){
            //consultar pelo código da categoria
            sql='SELECT * FROM perfil WHERE per_codigo = ? order by per_nome';
            parametros = [parametroConsulta];
        }
        else{
            //consultar pela descricao
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM perfil WHERE per_nome like ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaPerfil = [];
        for (const registro of registros){
            const perfil = new Perfil(registro.per_codigo,registro.per_nome);
            listaPerfil.push(perfil);
        }
        return listaPerfil;
    }
}