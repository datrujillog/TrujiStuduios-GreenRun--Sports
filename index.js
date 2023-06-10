const express = require('express');
const morgan = require('morgan');

const {config} = require('./src/configs/config');

const app = express();
require('colors');

// importamos las rutas
const Users = require('./src/routes/userRoute');


//Utilizamos Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(cors({
//     origin:["http://localhost:3000","http://127.0.0.1:5500"],
//     credentials:true
// }))


// Utilizamos las rutas
Users(app);

app.get('/', (req, res) => {
    res.json({message: "Hello World"});
});





module.exports = {app};

