const { User } = require('../database/index');
// const { Bets } = require('../database/index');
const { UserBets } = require('../database/index');
const { Transaction } = require('../database/index');
const hasPermission = require('../helpers/hasPermission');

const BaseService = require('./baseService');

const UserService = require('./userService');

const betsService = require('./betsService');
const transactionService = require('./transactionService');

const { Op } = require("sequelize");



class betsUserService extends BaseService {
    constructor() {
        super(UserBets);
        this.userServ = new UserService();
        this.betsServ = new betsService();
        this.transactionServ = new transactionService();

    }



    async createUserBet(userId, body) {
        //buscamos el usuario
        // const userBet = 'ee484328-c915-4386-ad75-f75fa727dd9c'
        const { results: user } = await this.userServ.userOne(userId, body.userId);

        const userBetId = body.betId;
        const bets = await this.betsServ.betsOne(userBetId);

        //verificamos que la apuesta este active para poder apostar
        // console.log('bets <> ', bets.entity.dataValues.status);


        if (bets.entity.dataValues.status === "active") {
            // buscamos el balance del usuario para verificar que tenga credito para apostar
            const balance = await this.transactionServ.getBalance(userId, body.userId);
            // console.log('balance <> ', balance);
            if (body.amount > balance.balance || body.amount <= 0)
                throw new Error('No tienes suficiente credito para apostar');

            //guardamos la apuesta del usuario en la tabla userBets 
            const userBet = await UserBets.create(body);

            //actualizamos el balance del usuario
            const newBalance = balance.balance - body.amount;
            console.log('newBalance <> ', newBalance);
            await this.userServ.userUpdate(userId, body.userId, { balance: newBalance });

            //creamos la transaccion
            const datauserBet = {
                userId: body.userId,
                betId: body.betId,
                amount: body.amount,
                category: "bet",
                status: "active",
                userBetId: "bet",
            }
            const newTransaction = await Transaction.create(datauserBet);

            return {
                id: userBet.id,
                message: `The bet has been successfully placed`,
                name: bets.entity.dataValues.name,
                amount: body.amount,
                balance: newBalance,
                status: bets.entity.dataValues.status,

            }

        }
        else {
            throw new Error('La apuesta no esta activa');
        }


    }





    // const user = await this.userServ.findById(userId);


}

module.exports = betsUserService;