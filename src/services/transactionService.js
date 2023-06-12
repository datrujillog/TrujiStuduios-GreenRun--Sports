const { User } = require('../database/index');
const { Transaction } = require('../database/index');
const { UserBets } = require('../database/index');
const { Bets } = require('../database/index');

const BaseService = require('./baseService');


class transactionService extends BaseService {
    constructor() {
        super(Transaction);
    }

    async getAll() {
        try {
            const transactions = await this.get();
            const users = await User.findAll(); //
            console.log(users);

            return {
                count: transactions.entities.length,
                transactions: transactions.entities.map((transaction) => {
                    return {
                        id: transaction.id,
                        amount: transaction.amount,
                        userId: transaction.userId,
                        userBetId: transaction.userBetId,
                        category: transaction.category,
                        status: transaction.status,
                        createdAt: transaction.createdAt,
                        updatedAt: transaction.updatedAt,
                        user: users.find((user) => user.id === transaction.userId),
                    }
                }),
            }
        } catch (error) {
            throw error;
        }
    }


    // esta funcion es para depositar dinero en la cuenta del usuario 
    async deposit(userId, amount) {
        try {
            // userId = '236ec7f2-9255-47ff-8d9d-1ff59f5fbf6e'
            const user = await User.findOne({ where: { id: userId } }); // buscamos el usuario por id
            if (!user) return { message: ` El usuario con el Id ${userId} no existe` };
            
            const newBalance = user.balance + amount;

            await User.update({ balance: newBalance }, { where: { id: userId } });

            const depositData = {
                amount: amount,
                userId: userId,
                userBetId: "Deposit",
                category: "Deposit",
                status: "Deposit",
            }

            const newDeposit = await Transaction.create(depositData); // se crea la transaccion en la tabla de transacciones
            return {
                id: newDeposit.id,
                status: "200",
                amount: newDeposit.amount,
                message: `Se ha depositado $ ${amount} a la cuenta del usuario ${user.firstName}, ${user.lastName}`,
            }

        } catch (error) {
            throw error;
        }
    }

    // esta funcion es para retirar dinero de la cuenta del usuario
    async withdraw(userId, amount) {

        const user = await User.findOne({ where: { id: userId } }); // buscamos el usuario por id
        if (!user) return { message: ` El usuario con el Id ${userId} no existe` };

        if (user.balance < amount) return { message: ` El usuario  " ${user.username} "  Nombre completo " ${user.firstName} ${user.lastName} " no tiene suficiente dinero en su cuenta` };

        const newBalance = user.balance - amount;

        await User.update({ balance: newBalance }, { where: { id: userId } });

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
            message: `Se ha retirado $ ${amount} de la cuenta del usuario ${user.firstName}, ${user.lastName}`,
        }

    }

}

module.exports = transactionService;