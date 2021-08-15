const {clientneo4j} = require("../database/neo4j");

const adicionaPessoa = async (req, res) => {

    const obj = {
        nome: req.body.nome,
        email: req.body.email
    };
    await clientneo4j.run('CREATE (p:Pessoa{nome:$nome, email:$email}) RETURN p', {
            nome: obj.nome,
            email: obj.email
        }).then((res.send('Sucesso!!')))
        .catch(error => console.log(error))
        .then(() => {
            clientneo4j.close
        });
}

//adicionando as ligações de seguir entre usuarios

const adicionaAmizade = async (req, res) => {
    const obj= {
        email1: req.body.email1,
        email2: req.body.email2 
    }
    await clientneo4j.run('MATCH (p1:Pessoa), (p2:Pessoa) WHERE p1.email=$email1 AND p2.email=$email2 CREATE (p1)-[:AMIGO]->(p2)',
        {
            email1: obj.email1, 
            email2: obj.email2
        })
        .then((res.send('Sucesso!!')))
        .catch(error => console.log(error))
        .then(() => {
            clientneo4j.close
        });
}

const seguirPessoa = async (req, res) => {
    const obj = {
        nome: req.body.nome
    }
    await clientneo4j.run('MATCH (p:Pessoa{nome:$nome})-[:AMIGO]->(p2) RETURN p2', {
        nome: obj.nome,
    }).then(result => {
        var userArr = [];
        
        result.records.forEach((record) => {
            userArr.push({
                nome: record._fields[0].properties.nome
            })
        });
        (res.send(userArr))
    })

}

const recomendaAmizade = async (req, res) => {
    const obj = {
        nome: req.body.nome
    }
    await clientneo4j.run('MATCH (p:Pessoa{nome:$nome})-[:AMIGO]->(p2)-[:AMIGO]->(p3) where p <> p3 RETURN p3', {
        nome: obj.nome,
    }).then(result => {
        var userArr = [];
        
        result.records.forEach((record) => {
            userArr.push({
                nome: record._fields[0].properties.nome
            })
        });
        (res.send(userArr))
    })

}


module.exports = {
    adicionaPessoa,
    adicionaAmizade,
    seguirPessoa,
    recomendaAmizade
};