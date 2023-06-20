const BaseService = require('./baseService');

const { User: UserModel } = require('../database/index');
const { Transaction } = require('../database/index');
const hasPermission = require('../helpers/hasPermission');
const { httpStatusCodes } = require('../helpers/httpStatusCodes');

class UserService extends BaseService {

    constructor() {
        super(UserModel);
    }



    async userOne(userId, id) {
        try {
            await hasPermission(userId, id);
            const results = await UserModel.findOne({ where: { id } });
            if (!results) return { message: `User with Id ${id} does not exist....` };
            return { results };
        } catch (error) {
            console.log(error);
            throw new Error(`${error.message}`);
        }
    }


    async userUpdate(userId,id, body) {
        try {
            await this.userOne(userId, id);

            const { firstName, lastName, password, phone, email, username,balance, address, gender, birthDate, city, category } = body;

            const userUpdate = await this.model.update(
                { firstName, lastName, password, phone, email, username,balance, address, gender, birthDate, city, category },
                { where: { id } }
            );

            return {
                update: true,
                message: `User with user ${firstName} ${lastName} was successfully updated`,
                userUpdate
            };
        } catch (error) {
            throw error;
        }
    }


    async getByEmail(email = "") {
        try {
            const entity = await this.model.findOne({ where: { email } });
            if (!entity) {
                throw new Error(`El email ${email} no existe`);
            }
            return {
                entity
            }
        }
        catch (err) {
            throw err;
        }
    }





















    //Hacer una apuesta en un evento específico
    // async userBet(id, userId, body) {
    //     try {
    //         const user = await User.findOne({ where: { id: userId } });
    //         if (!user) return { message: ` El usuario con el Id ${userId} no existe` };

    //         const transaction = await Transaction.findOne({ where: { id } });

    //         const { amount } = body;

    //         if (transaction) {
    //             const newAmount = transaction.amount + amount;
    //             const transactionUpdate = await Transaction.update(
    //                 { amount: newAmount },
    //                 { where: { id } }
    //             );
    //             return {
    //                 update: true,
    //                 message: `La transacción con el id ${id} se actualizó correctamente`,
    //                 data: transactionUpdate
    //             };
    //         }

    //         const transactionCreate = await Transaction.create(
    //             { amount, userId },
    //             { where: { id } }
    //         );

    //         return {
    //             create: true,
    //             message: `La transacción con el id ${id} se creó correctamente`,
    //             data: transactionCreate
    //         };


    //     } catch (error) {
    //         console.log(error);
    //         throw error;
    //     }
    // }





















    //////////////////////////////////////




    //borrar el usuario por id pero no lo borra de la base de datos con el campo deleted 
    // async delete(id) {
    //     try {
    //         const user = await User.findByPk(id);
    //         if (user) {
    //             user.deleted = true;
    //             await user.save();
    //             return {
    //                 deleted: true,
    //                 data: user
    //             }
    //         } else {
    //             throw new Error('User not found');
    //         }



    //     } catch (err) {
    //         throw err;
    //     }
    // }


    // async delete(id){
    //     try{
    //         const user = await User.destroy({
    //             where: {
    //                 id
    //             }
    //         });
    //         return {
    //             deleted: true,
    //             data: user
    //         }
    //     }catch(err){
    //         throw err;
    //     }
    // }



}

module.exports = UserService;







