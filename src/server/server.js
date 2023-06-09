require('colors');
const {config} = require('../configs/config');
const {app} = require('../../index');
const {conn} = require('../database/index');


// startServer(app);


conn.sync({ force: false }).then(() => {  // force: false es para que no borre la base de datos
    console.log("Base de datos conectada".bgGreen);

    console.log("")

    app.listen(config.port, () => {
        console.log("")
        console.log(`Server is running on port ${config.port.bgBlue} in " ${config.env.bgBlue} " mode`.bgRed);
        console.log("")
        console.log(`http://localhost:${config.port.bgBlue}`.bgRed);
    });
});



// async function startServer(app) {
//     // connection();
//     app.listen(config.port, () => {
//         console.log("")
//         console.log(`Server is running on port ${config.port.bgBlue} in " ${config.env.bgBlue} " mode`.bgRed);
//         console.log("")
//         console.log(`http://localhost:${config.port.bgBlue}`.bgRed);
//     });

// }