const client = require("../database/postgres");
const clientredis = require("../database/redis");

//funcoes

//busca lista de usuarios
const listaUsuarios = (request, response) =>{
    client.query('SELECT * FROM usuarios', (error, results) => {
        if(error){
            response.status(400).send(error);
            return;
        }
        response.status(200).json(results.rows);
    });
}

//adiciona um novo usuario
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

//edita informacoes de um usuario    
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

//deleta um usuario    
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

//busca um usuario pelo id
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

//salva uma postagem no cache
const cachePostagem = (request, response) =>{
    const {id,postagem} = request.body;
    
    clientredis.setex(id , 7200, postagem, function(err, resp){
        if(err) throw err;
        response.status(200).json([{ id: id, postagem: postagem }]);
    }); 
};

//recupera a postagem no cache
const buscaPostagem = (request, response) =>{
    const id = parseInt(request.params.id)
    
    clientredis.get(id, function(err, reply){
        if(reply != null){
            response.status(200).json([{ id: id, texto: reply}])
        }else{
            response.status(400).send({ menssagem:"A o texto escrito não foi encontrado"});
        }
    });
};

module.exports = {
    listaUsuarios,
    adicionaUsuario,
    atualizaUsuario,
    deletaUsuario,
    buscaUsuario,
    cachePostagem,
    buscaPostagem
};