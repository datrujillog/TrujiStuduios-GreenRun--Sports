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
const User = UserFactory(sequelize, Sequelize)
const Transaction = TransactionFactory(sequelize, Sequelize)
const UserBets = UserBetFactory(sequelize, Sequelize)
const Bets = BetFactory(sequelize, Sequelize)

//ACA VAMOS HACER LAS RELACIONES ENTRE LAS TABLAS DE NUESTRO MODELO DE DATOS

//Relacion de uno User a muchos UserBets 1:M
User.hasMany(UserBets, { foreignKey: 'userId', sourceKey: 'id' });
UserBets.belongsTo(User, { foreignKey: 'userId', sourceKey: 'id' });


//Relacion de un User a muchos Transactions 1:M
User.hasMany(Transaction, { foreignKey: 'userId', sourceKey: 'id' });
Transaction.belongsTo(User, { foreignKey: 'userId', sourceKey: 'id' });


//Relacion de Bets a UserBets 1:M
Bets.hasMany(UserBets, { foreignKey: 'betId', sourceKey: 'id' });
UserBets.belongsTo(Bets, { foreignKey: 'betId', sourceKey: 'id' });


// relacion de la tabla Transaction y UserBets 1:0  de una transaccion a Cero UserBets
Transaction.hasOne(UserBets, { foreignKey: 'transactionId', sourceKey: 'id' }); 
UserBets.belongsTo(Transaction, { foreignKey: 'transactionId', sourceKey: 'id' }); 







// Transaction.hasMany(UserBets, { foreignKey: 'transactionId', sourceKey: 'id' }); // seria de 1 a 0
// UserBets.belongsTo(Transaction, { foreignKey: 'transactionId', sourceKey: 'id' }); // seria de 0 a 1






module.exports = {
    conn: sequelize,
    User,
    Transaction,
    UserBets,
    Bets
}

