import express from 'express';
import cors from 'cors';
import rotaPerfil from './Rotas/rotaPerfil.js';
import rotaUsuario from './Rotas/rotaUsuario.js';

const host='0.0.0.0';
const porta='3000';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/perfil',rotaPerfil);
app.use('/usuario',rotaUsuario);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
