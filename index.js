require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

app.listen(port, ()=>{
    console.log(`App running on port ${port}.`);
});

const datab = require('./controller/postagemcontroller');

app.get('/usuarios', datab.listaUsuarios);
app.post('/usuarios', datab.adicionaUsuario);
app.put('/usuarios', datab.atualizaUsuario);
app.delete('/usuario/:id', datab.deletaUsuario);
app.get('/usuario/:id', datab.buscaUsuario);
app.post('/postagem/', datab.cachePostagem);
app.get('/postagem/:id', datab.buscaPostagem);