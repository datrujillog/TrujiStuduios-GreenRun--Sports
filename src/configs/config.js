require("dotenv").config();


const config = {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    dbUser: process.env.DB_USER || "root",
    dbName: process.env.DB_NAME || "DB_GREENRUN",
    dbPort: process.env.DB_PORT || "3306",
    dbHos: process.env.DB_HOST || "127.0.0.1",
    dbPassword: process.env.DB_PASSWORD || "root",
    host: process.env.HOST || "127.0.0.1",
    jwtSecret: process.env.JWT_SECRET || "secret",
};


module.exports = {config}