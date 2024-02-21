import PerfilDAO from "../Persistencia/perfilDAO.js";
//não esqueça do .js no final da importação

export default class Perfil {
    //definição dos atributos privados
    #codigo;
    #nome;

    constructor(codigo=0, nome=''){
        this.#codigo=codigo;
        this.#nome=nome;
    }

    //métodos de acesso públicos

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome = novoNome;
    }

    //override do método toJSON
    toJSON()     
    {
        return {
            codigo:this.#codigo,
            nome:this.#nome
        }
    }

    //camada de modelo acessa a camada de persistencia
    async gravar(){
        const perfilDAO = new PerfilDAO();
        await perfilDAO.gravar(this);
    }

    async excluir(){
        const perfilDAO = new PerfilDAO();
        await perfilDAO.excluir(this);
    }

    async atualizar(){
        const perfilDAO = new PerfilDAO();
        await perfilDAO.atualizar(this);

    }

    async consultar(parametro){
        const perfilDAO = new PerfilDAO();
        return await perfilDAO.consultar(parametro);
    }
}