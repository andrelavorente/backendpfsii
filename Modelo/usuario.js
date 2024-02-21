import UsuarioDAO from "../Persistencia/usuarioDAO.js";

export default class Usuario{
    #codigo;
    #senha;
    #login;
    #dataAlteracao;
    #dataCriacao;
    #perfil;

    constructor(codigo=0,login="", senha="", 
               dataAlteracao="",dataCriacao="", perfil=0){
        this.#codigo=codigo;
        this.#dataAlteracao=dataAlteracao;
        this.#dataCriacao=dataCriacao;
        this.#senha=senha;
        this.#login=login;
        this.#perfil=perfil;
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }
    get login(){
        return this.#login;
    }
    set login(novoLogin){
        this.#login = novoLogin;
    }
    get dataAlteracao(){
        return this.#dataAlteracao;
    }
    set dataAlteracao(novaData){
        this.#dataAlteracao = novaData;
    }
    
    get dataCriacao(){
        return this.#dataCriacao;
    }
    set dataCriacao(novaData){
        this.#dataCriacao = novaData;
    }
    get senha(){
        return this.#senha;
    }
    set senha(novaSenha){
        this.#senha = novaSenha;
    }

    get perfil(){
        return this.#perfil;
    }
    set perfil(novoPerfil){
        this.#perfil = novoPerfil;
    }
    
    toJSON(){
        return {
            codigo:this.#codigo,
            login:this.#login,
            senha:this.#senha,
            dataCriacao:this.#dataCriacao,
            dataAlteracao:this.#dataAlteracao,
            perfil:this.#perfil,
        }
    }

     //camada de modelo acessa a camada de persistencia
     async gravar(){
        const usuarioDAO = new UsuarioDAO();
        await usuarioDAO.gravar(this);
     }
 
     async excluir(){
        const usuarioDAO = new UsuarioDAO();
        await usuarioDAO.excluir(this);
     }
 
     async alterar(){
        const usuarioDAO = new UsuarioDAO();
        await usuarioDAO.atualizar(this);
     }
 
     async consultar(termo){
        const usuarioDAO = new UsuarioDAO();
        return await usuarioDAO.consultar(termo);
     }

}