require('dotenv').config();

const {Client} = require('pg');
const client = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD
});

client.connect()
    .then(()=> console.log('Conectado com o banco'))
    .catch(err => console.log(err.stack));

const listaUsuarios = (request, response) =>{
    client.query('SELECT * FROM usuarios', (error, results) => {
        if(error){
            response.status(400).send(error);
            return;
        }
        response.status(200).json(results.rows);
    });
}
    
const adicionaUsuario = (request, response) =>{
    const {nome,email} = request.body;
    
    client.query(`INSERT INTO usuarios (nome, email) VALUES ($1, $2)`, 
        [nome,email],(error, results) =>{
        if(error){
            response.status(400).send(error);
            return;
        }
        response.status(200).send('Usuário adicionado com sucesso');
    });
};
    
const atualizaUsuario = (request, response) => {
        
    const { nome, email } = request.body;
      
    client.query(
        'UPDATE usuarios SET nome = $1 WHERE email=$2',
            [nome, email],
            (error, results) => {
            if (error) {
                response.status(400).send(error);
                return;
            }
        response.status(200).send('Usuário atualizado com sucesso');
    });
};
    
const deletaUsuario = (request, response) => {
    const id = parseInt(request.params.id)
      
    client.query('DELETE FROM usuarios WHERE id = $1', [id], (error, results) => {
        if (error) {
            response.status(400).send(error);
            return;
        }
        response.status(200).send('Usuário excluído com sucesso');
    });
};

const buscaUsuario = (request, response) => {
    const id = parseInt(request.params.id)
      
    client.query('SELECT * FROM usuarios WHERE id = $1', [id], (error, results) => {
        if (error) {
            response.status(400).send(error);
            return;
        }
        response.status(200).json(results.rows);
    });
};
module.exports = {
    listaUsuarios,
    adicionaUsuario,
    atualizaUsuario,
    deletaUsuario,
    buscaUsuario
};