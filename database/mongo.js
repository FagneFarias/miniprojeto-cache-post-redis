const { MongoClient } = require('mongodb');

const clientmongo = new MongoClient(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
    { useUnifiedTopology: true });

    clientmongo.connect().then(()=> {
        console.log("Conectado com o mongo")
    }).catch((erro) => {
        console.log('Erro')
    })

    module.exports = clientmongo;