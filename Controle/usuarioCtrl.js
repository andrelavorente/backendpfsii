import Usuario from "../Modelo/usuario.js";

export default class UsuarioCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            
            const login = dados.login;
            const senha = dados.senha;
            const dataCriacao = dados.dataCriacao;
            const dataAlteracao = dados.dataAlteracao;
            const codigo_perfil = dados.perfil;


            if (login && senha && dataCriacao && dataAlteracao
                && codigo_perfil) {
                const usuario = new Usuario(0, login, senha,
                    dataCriacao, dataAlteracao, codigo_perfil
                );
                //resolver a promise
                usuario.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": usuario.codigo,
                        "mensagem": "Usuário incluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar o usuário:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, os dados do usuário segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um usuário!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
           
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const login = dados.login;
            const senha = dados.senha;
            const dataCriacao = dados.dataCriacao;
            const dataAlteracao = dados.dataAlteracao;
            const codigo_perfil = dados.perfil;

            if (codigo && login && senha && dataCriacao && dataAlteracao
                && codigo_perfil) {
                    const usuario = new Usuario(codigo, login, senha,
                        dataCriacao, dataAlteracao, codigo_perfil
                    );
                //resolver a promise
                usuario.alterar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Usuário atualizado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o usuário:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do usuário segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um usuário!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const usuario = new Usuario(codigo);
                //resolver a promise
                usuario.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Usuário excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o usuário:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do usuário!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um produto!"
            });
        }
    }


    consultar(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const usuario = new Usuario();
            usuario.consultar(termo).then((listaUsuarios) => {
                resposta.json(
                    {
                        status: true,
                        listaUsuarios
                    });
            })
                .catch((erro) => {
                    resposta.json(
                        {
                            status: false,
                            mensagem: "Não foi possível obter os usuários: " + erro.message
                        }
                    );
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar usuários!"
            });
        }
    }
}