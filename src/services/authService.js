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

    // async login(data) {
    //     const { email, password } = data

    //     const user = await await this.userServ.findOneByField('email', email)


    //     if (user.entity && await this.#compare(password, user.entity.password)) {
    //         return this.#getUserData(user.entity)
    //     }

    //     return {
    //         success: false,
    //         errors: ['Las credenciales son incorrectas']
    //     }
    // }


    async login(data) {
        const { email, password } = data;
        
        const { entity } = await this.userServ.findOneByField('email', email);
        const credentialsMatch = entity && await this.#compare(password, entity.password);

        return credentialsMatch
            ? this.#getUserData(entity)
            : {
                success: false,
                errors: ['Las credenciales son incorrectas']
            };
    }

    async signup(data) {
        const validRoles = ['user', 'admin', 'superadmin'];

        if (!validRoles.includes(data.role)) {
            return {
                created: false,
                error: `Valor no válido para el campo "role". Los valores válidos son: ${validRoles.join(', ')}.`,
            };
        }

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





