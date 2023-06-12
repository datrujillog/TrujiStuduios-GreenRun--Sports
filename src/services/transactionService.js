const { User } = require('../database/index');
const { Transaction } = require('../database/index');
const { UserBets } = require('../database/index');
const { Bets } = require('../database/index');

const BaseService = require('./baseService');


class transactionService extends BaseService {
    constructor(){
        super(Transaction);
    }

    async getAll(){
        try{
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
        }catch(error){
            throw error;
        }
    }
    

// esta funcion es para depositar dinero en la cuenta del usuario 
    async deposit(userId, amount){
        try{
            const user = await User.findOne({where: {id: userId}}); // buscamos el usuario por id
            if(!user)  return {message: ` El usuario con el Id ${userId} no existe`};

            const newBalance = user.balance + amount; 

            await User.update({balance: newBalance}, {where: {id: userId}}); 
            
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





















            
            // const depositData = {
            //     amount: amount,
            //     userId: userId,
            //     userBetId: "Deposit",
            //     category: "Deposit",
            //     status: "Deposit",
            // }

            // const newDeposit = await Transaction.create(depositData); // se crea la transaccion en la tabla de transacciones
            // return {
            //     id: newDeposit.id,
            //     status: "200",
            //     amount: newDeposit.amount,
            //     message: `Se ha depositado ${amount} a la cuenta del usuario ${user.name}`,
            // }

            
            
            
            
            

           
            
            

            
        }catch(error){
            throw error;
        }
    }
}

module.exports = transactionService;