const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const UserService = require('./userService');

const { jwtSecret } = require('../configs/config').config;



class AuthServices {

    async login(data) {
        const { username,email, password } = data

        const userServ = new UserService()
        const user = await userServ.getByEmail(username)

        if (user && await this.#compare(password, user.password)){
            return this.#getUserData(user)
        }

        return {
            success: false,
            errors: ['Las credenciales son incorrectas']
        }
    }

    async signup(data) {
        if (data && data.password) { // si existe data y data.password entonces encriptar
            data.password = await this.#encrypt(data.password);
        }


        const UserServ = new UserService();

        const user = await UserServ.create(data);
        if (!user.created) {
            return {
                created: false,
                error: user.error
            }
        }

        const userData = this.#getUserData(user.data);

        return {
            created: true,
            data: userData

        }


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
