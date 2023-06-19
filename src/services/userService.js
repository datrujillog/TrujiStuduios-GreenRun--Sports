const BaseService = require('./baseService');

const { User: UserModel } = require('../database/index');
const { Transaction } = require('../database/index');
const hasPermission = require('../helpers/hasPermission');
const { httpStatusCodes } = require('../helpers/httpStatusCodes');

class UserService extends BaseService {

    constructor() {
        super(UserModel);
    }


    async getAll() {
        try {
            const count = await UserModel.count();
            if (count === 0) {
                return {
                    count,
                    message: "No hay usuarios"
                };
            }

            const fields = { deleted: false };
            const exclude = null;

            const { count: usersCount, entities: users } = await this.findAllByFieldsAndExclude(fields, exclude);

            return {
                count: usersCount,
                users
            };
        } catch (error) {
            throw error;
        }
    }


    /**
     * Finds a user by their ID and checks if the requesting user has permission to access it.
     * @param {number} userId - The ID of the requesting user.
     * @param {number} id - The ID of the user to be found.
     * @returns {Promise<{user: Object}|{message: string}>} - An object containing the found user or an error message if the user does not exist.
     * @throws {Error} - If there is an error while finding the user or checking permissions.
     */
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



    /**
     * Updates a user's information by their ID and checks if the requesting user has permission to update it.
     * @param {number} userId - The ID of the requesting user.
     * @param {number} id - The ID of the user to be updated.
     * @param {Object} body - The updated user information.
     * @param {string} body.firstName - The updated first name of the user.
     * @param {string} body.lastName - The updated last name of the user.
     * @param {string} body.password - The updated password of the user.
     * @param {string} body.phone - The updated phone number of the user.
     * @param {string} body.email - The updated email of the user.
     * @param {string} body.username - The updated username of the user.
     * @param {string} body.address - The updated address of the user.
     * @param {string} body.gender - The updated gender of the user.
     * @param {string} body.birthDate - The updated birth date of the user.
     * @param {string} body.city - The updated city of the user.
     * @param {string} body.category - The updated category of the user.
     * @returns {Promise<{update: boolean, message: string, userUpdate: Object}>} - An object containing a boolean indicating if the update was successful, a message indicating the success or failure of the update, and the updated user information.
     * @throws {Error} - If there is an error while updating the user or checking permissions.
     */
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


    /**
     * Retrieves a user by their email address.
     * @param {string} email - The email address of the user to retrieve.
     * @returns {Promise<{entity: User}>} - A promise that resolves to an object containing the retrieved user entity.
     * @throws {Error} - If no user with the specified email address is found.
     */
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
    async userBet(id, userId, body) {
        try {
            const user = await User.findOne({ where: { id: userId } });
            if (!user) return { message: ` El usuario con el Id ${userId} no existe` };

            const transaction = await Transaction.findOne({ where: { id } });

            const { amount } = body;

            if (transaction) {
                const newAmount = transaction.amount + amount;
                const transactionUpdate = await Transaction.update(
                    { amount: newAmount },
                    { where: { id } }
                );
                return {
                    update: true,
                    message: `La transacción con el id ${id} se actualizó correctamente`,
                    data: transactionUpdate
                };
            }

            const transactionCreate = await Transaction.create(
                { amount, userId },
                { where: { id } }
            );

            return {
                create: true,
                message: `La transacción con el id ${id} se creó correctamente`,
                data: transactionCreate
            };


        } catch (error) {
            console.log(error);
            throw error;
        }
    }





















    //////////////////////////////////////




    //borrar el usuario por id pero no lo borra de la base de datos con el campo deleted 
    async delete(id) {
        try {
            const user = await User.findByPk(id);
            if (user) {
                user.deleted = true;
                await user.save();
                return {
                    deleted: true,
                    data: user
                }
            } else {
                throw new Error('User not found');
            }



        } catch (err) {
            throw err;
        }
    }


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







