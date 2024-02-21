import { Router } from "express";
import PerfilCtrl from "../Controle/perfilCtrl.js";

//rotas é o mapeamento das requisições da web para um determinado
//endpoint da aplicação

const perfilCtrl = new PerfilCtrl();
const rotaPerfil = new Router();

rotaPerfil
.get('/',perfilCtrl.consultar)
.get('/:termo', perfilCtrl.consultar)
.post('/',perfilCtrl.gravar)
.patch('/',perfilCtrl.atualizar)
.put('/',perfilCtrl.atualizar)
.delete('/',perfilCtrl.excluir);

export default rotaPerfil;