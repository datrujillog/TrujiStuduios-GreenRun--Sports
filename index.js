const express = require('express');
const {config} = require('./src/configs/config');


// const {config} = require('./src/server/server');


const app = express();
require('colors');

// iniciar o servidor na porta 3000 (localhost:3000)


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.json({message: "Hello World"});
});





module.exports = {app};

