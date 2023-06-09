require('colors');
const {config} = require('../configs/config');
const {app} = require('../../index');


startServer(app);


async function startServer(app) {
    // connection();
    app.listen(config.port, () => {
        console.log("")
        console.log(`Server is running on port ${config.port.bgBlue} in " ${config.env.bgBlue} " mode`.bgRed);
        console.log("")
        console.log(`http://localhost:${config.port.bgBlue}`.bgRed);
    });

}