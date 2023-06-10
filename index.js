const express = require('express');
const morgan = require('morgan');
const path = require('path');
const createError = require('http-errors');


const { config } = require('./src/configs/config');

const app = express();
require('colors');





// importamos las rutas
const Users = require('./src/routes/userRoute');
const auth = require('./src/routes/authRoute');


//Utilizamos Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//     origin:["http://localhost:3000","http://127.0.0.1:5500"],
//     credentials:true
// }))


// Utilizamos las rutas
Users(app);
auth(app);

// catch 404 and forward to error handler
// es para que cuando no encuentre la ruta mande un error
app.use(function (req, res, next) {
    next(createError(404));
}); 

// error handler
app.use(function (err, req, res, next) {
    // Set locals
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Send error response
    res.status(err.status || 500).json({ error: err.message });
});






module.exports = { app };

