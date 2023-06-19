const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const UserService = require('./userService');

const BaseService = require('./baseService');

const { jwtSecret } = require('../configs/config').config;
const { User } = require('../database/index');



class AuthServices {

    constructor() {
        this.userServ = new UserService();
    }


    /**
     * Authenticates a user with the provided email and password.
     * @param {Object} data - The user data to be authenticated.
     * @param {string} data.email - The email of the user to be authenticated.
     * @param {string} data.password - The password of the user to be authenticated.
     * @returns {Object} An object containing either the authenticated user data and a success message, or an error message.
     * @throws {Error} Throws an error if the provided credentials are incorrect.
     */
    async login(data) {
        const { email, password } = data;
        const { entity } = await this.userServ.getByEmail(email);
        const credentialsMatch = entity && await this.#compare(password, entity.password);
        if (!credentialsMatch) throw new Error(`El password no coincide con el email ${email}`);
        return this.#getUserData(entity);
    }


    /**
     * Creates a new user account with the provided data.
     * If a password is provided, it will be encrypted before being stored.
     * @param {Object} data - The user data to be stored.
     * @returns {Object} An object containing either the newly created user data and a success message, or an error message.
     */
    async signup(data) {
        if (data.password) {
            data.password = await this.#encrypt(data.password);
        }
        const { created, error, data: userData } = await new UserService().create(data);
        return {
            created,
            ...(created ? { data: this.#getUserData(userData) } : { error }),
        };
    }



    #getUserData(user) {
        const userData = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            phone: user.phone,
            email: user.email,
            username: user.username,
            address: user.address,
            gender: user.gender,
            birthDate: user.birthDate,
            countryId: user.countryId,
            city: user.city,
            category: user.category,
            documentId: user.documentId,
        };

        const token = this.#createToken(userData);
        return {
            success: true,
            token,
            user: userData,
        };
    }

    #createToken(payload) {
        const token = jwt.sign(payload, jwtSecret, {
            expiresIn: '5d'
        })

        return token
    }

    async #compare(string, hash) {
        try {
            const result = await bcrypt.compare(string, hash)
            return result
        } catch (error) {
            return false
        }
    }

    async #encrypt(string) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(string, salt);
            return hash;
        } catch (err) {
            console.log(err);
        }

    }

}

module.exports = AuthServices;





