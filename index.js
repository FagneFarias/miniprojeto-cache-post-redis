require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

app.listen(port, ()=>{
    console.log(`App running on port ${port}.`);
});

const datab = require('./controller/postagemcontroller');
const neodata = require('./controller/neo4jcontroller');

app.get('/usuarios', datab.listaUsuarios);
app.post('/usuarios', datab.adicionaUsuario);
app.put('/usuarios', datab.atualizaUsuario);
app.delete('/usuario/:id', datab.deletaUsuario);
app.get('/usuario/:id', datab.buscaUsuario);
app.post('/postagem/', datab.cachePostagem);
app.get('/postagem/:id', datab.buscaPostagem);
app.post('/postagem/criar/', datab.criaPostagem);
app.get('/postagem/filtrar/:email', datab.filtraPostagem);
app.post('/user/neo4j/add', neodata.adicionaPessoa);
app.post('/user/neo4j/amizade', neodata.adicionaAmizade);
app.get('/user/neo4j/seguindo', neodata.seguirPessoa);
app.get('/user/neo4j/recomenda', neodata.recomendaAmizade);