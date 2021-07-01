const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

app.listen(port, ()=>{
    console.log(`App running on port ${port}.`);
});

const db = require('./database');

app.get('/usuarios', db.listaUsuarios);
app.post('/usuarios', db.adicionaUsuario);
app.put('/usuarios', db.atualizaUsuario);
app.delete('/usuario/:id', db.deletaUsuario);
app.get('/usuario/:id', db.buscaUsuario);