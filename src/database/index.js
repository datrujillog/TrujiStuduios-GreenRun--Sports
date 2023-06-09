const { Sequelize } = require('sequelize'); 

const { config } = require('../configs/config');

// import delos modelos
const UserFactory = require('./models/userModel.js')
const TransactionFactory = require('./models/transactionsModel.js')
const UserBetFactory = require('./models/userBetsModel')
const BetFactory = require('./models/betsModel.js')

// aca vamos a setear nuestra base de datos
const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, { 
    host: config.dbHost,
    dialect: "mysql",
    port: config.dbPort,
    logging: false,
    define: {
        timestamps: false,
    },
});

// const Character = CharacterFactory(sequelize, Sequelize);
// const Film = filmsFactory(sequelize, Sequelize);
// const Gender = gendersFactory(sequelize, Sequelize);
const User =  UserFactory(sequelize, Sequelize)
const Transaction = TransactionFactory(sequelize, Sequelize)
const UserBets = UserBetFactory(sequelize, Sequelize)
const Bets = BetFactory(sequelize, Sequelize)

//ACA VAMOS HACER LAS RELACIONES ENTRE LAS TABLAS DE NUESTRO MODELO DE DATOS
// Character.belongsToMany(Film, { through: 'CharacterFilm' });
// Film.belongsToMany(Character, { through: 'CharacterFilm' });
// Gender.hasMany(Film);
// Film.belongsTo(Gender);
// User.hasMany(Character);
// Character.belongsTo(User);
// User.hasMany(Film);
// Film.belongsTo(User);



module.exports = {
    conn: sequelize,
    User,
    Transaction,
    UserBets,
    Bets


}
