
const redis = require("redis");

const clientredis = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

clientredis.on("connect", function(error){
    console.log("Conectado com o redis");
});

module.exports = clientredis;