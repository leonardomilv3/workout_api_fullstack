const express = require('express');

const server = express();

server.get('/', (resquest, response) => {
    response.send('Hello World');
});

server.listen(3000, () => {
    console.log("Estou na porta 3000");
});