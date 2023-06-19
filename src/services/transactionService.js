'use strict'
const { Op } = require("sequelize");

const { User } = require('../database/index');
const { Transaction } = require('../database/index');
const { UserBets } = require('../database/index');
const { Bets } = require('../database/index');

const BaseService = require('./baseService');
const UserService = require('./userService');


class transactionService extends BaseService {
    constructor() {
        super(Transaction);
        this.userServ = new UserService();


    }
  
    async deposit(userId, id, amount) {
        const { results: user } = await this.userServ.userOne(userId, id);
        const newBalance = user.balance + amount;
        await this.userServ.userUpdate(userId, id, { balance: newBalance });
        const depositData = {
            amount: amount,
            userId: userId,
            userBetId: "Deposit",
            category: "Deposit",
            status: "Deposit",
        }
        const newDeposit = await Transaction.create(depositData);
        return {
            id: newDeposit.id,
            status: "200",
            amount: newDeposit.amount,
            message: `Se ha depositado $ ${amount} a la cuenta del usuario ${user.firstName} ${user.lastName}`,
            message: `$ ${amount} has been deposited to the account of the user ${user.firstName} ${user.lastName}`,
        }
    }


    async withdraw(userId, id, amount) {
        const { results: user } = await this.userServ.userOne(userId, id);

        if (user.balance < amount) return { message: ` El usuario  " ${user.username} "  Nombre completo " ${user.firstName} ${user.lastName} " no tiene suficiente dinero en su cuenta` };

        const newBalance = user.balance - amount;

        await this.userServ.userUpdate(userId, id, { balance: newBalance });

        const withdrawData = {
            amount: amount,
            userId: userId,
            userBetId: "Withdraw",
            category: "Withdraw",
            status: "Withdraw",
        }

        const newWithdraw = await Transaction.create(withdrawData);
        return {
            id: newWithdraw.id,
            status: "200",
            amount: newWithdraw.amount,
            message: `Se ha retirado $ ${amount} de la cuenta del usuario ${user.firstName} ${user.lastName}`,
        }

    }


    async getBalance(userId, id) {
        const { results: user } = await this.userServ.userOne(userId, id);

        const deposit = await Transaction.sum('amount', { where: { userId: id, category: 'Deposit' } });   // suma de los depositos 
        const withdraw = await Transaction.sum('amount', { where: { userId: id, category: 'Withdraw' } }); // suma de los retiros
        const bet = await Transaction.sum('amount', { where: { userId: id, category: 'Bet' } });            // suma de las apuestas
        const winning = await Transaction.sum('amount', { where: { userId: id, category: 'Winning' } });    // suma de las ganancias
        const balance = (deposit + winning) - (withdraw + bet); // balance actual del usuario 

        return {
            userId: id,
            balance: balance,
            message: `The current balance of user ${user.firstName} ${user.lastName} is $ ${balance}`,
        }
    }


    async getTransactions(userId, id, type) {
        await this.userServ.userOne(userId, id);

        const whereClause = {
            userId: id,
            category: type || { [Op.ne]: null }, // Filtrar por categoría si se proporciona, de lo contrario, incluir todas las categorías
        };

        const transactions = await Transaction.findAll({
            where: whereClause,
        });

        const formattedTransactions = transactions.map((transaction) => ({
            id: transaction.id,
            amount: transaction.amount,
            userId: transaction.userId,
            userBetId: transaction.userBetId,
            category: transaction.category,
            status: transaction.status,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt,
        }));

        return {
            count: formattedTransactions.length,
            transactions: formattedTransactions,
        };
    }


}

module.exports = transactionService;















// async getTransactions(userId, id, type) {
//     try {
//         await this.userServ.userOne(userId, id);

//         const whereClause = {
//             userId: id,
//         };

//         if (type) {
//             whereClause.category = type;
//         }

//         const transactions = await Transaction.findAll({
//             where: whereClause,
//         });

//         return {
//             count: transactions.length,
//             transactions: transactions.map((transaction) => {
//                 return {
//                     id: transaction.id,
//                     amount: transaction.amount,
//                     userId: transaction.userId,
//                     userBetId: transaction.userBetId,
//                     category: transaction.category,
//                     status: transaction.status,
//                     createdAt: transaction.createdAt,
//                     updatedAt: transaction.updatedAt,
//                 }
//             }),
//         };
//     } catch (error) {
//         throw error;
//     }
// }


