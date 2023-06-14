'use strict';

const express = require('express');

const AuthServices = require('../services/authService');

const authMiddleware = require('../middlewares/authValidation');

const { httpStatusCodes } = require('../helpers/httpStatusCodes');
const { validarRegistro } = require('../middlewares/validateMiddleware');

const { body } = require('express-validator');


function AuthRouter(app) {
    const router = express.Router();
    const authServ = new AuthServices();

    app.use('/api/v1/auth', router);

    router.get("/validate", (req, res) => {
        return res.json({
            success: true,
            user: req.user
        })
    })

    router.post('/login', async (req, res) => {
        const result = await authServ.login(req.body);
        if (result.success) {
            return res.status(200).json({
                error: false,
                message: httpStatusCodes[200],
                data: result
            });
        }
        return res.status(401).json({
            error: true,
            message: httpStatusCodes[401],
            data: result

        });

    });

    // como agrego el middleware de validaciones aca? dame un ejemplo porfa 


    router.post('/signup', validarRegistro(), async (req, res) => {

        const { body } = req;

        const result = await authServ.signup(body);
        if (result) {
            return res.status(201).json({
                error: false,
                message: httpStatusCodes[201],
                data: result
            });
        }
        return res.status(400).json({
            error: true,
            message: httpStatusCodes[400],
            data: result
        });







        // res.status(201).json({
        //     error: false,
        //     message: httpStatusCodes[201],
        //     data: result
        // });

    });
}

module.exports = AuthRouter;




// {
//     "components": {
//       "schemas": {
//         "signup": {
//           "type": "object",
//           "properties": {
//             "firstName": {
//               "type": "string"
//             },
//             "lastName": {
//               "type": "string"
//             },
//             "role": {
//               "type": "string"
//             },
//             "password": {
//               "type": "string"
//             },
//             "phone": {
//               "type": "string"
//             },
//             "email": {
//               "type": "string",
//               "format": "email"
//             },
//             "username": {
//               "type": "string"
//             },
//             "address": {
//               "type": "string"
//             },
//             "gender": {
//               "type": "string"
//             },
//             "birthDate": {
//               "type": "string",
//               "format": "date"
//             },
//             "countryId": {
//               "type": "integer"
//             },
//             "city": {
//               "type": "string"
//             },
//             "category": {
//               "type": "string"
//             },
//             "documentId": {
//               "type": "integer"
//             }
//           },
//           "required": [
//             "firstName",
//             "lastName",
//             "role",
//             "password",
//             "phone",
//             "email",
//             "username",
//             "address",
//             "gender",
//             "birthDate",
//             "countryId",
//             "city",
//             "category",
//             "documentId"
//           ]
//         }
//       }
//     },
//     "paths": {
//       "/api/v1/auth/signup": {
//         "post": {
//           "summary": "Registro de usuario",
//           "tags": [
//             "Auth"
//           ],
//           "description": "Registro de usuario",
//           "requestBody": {
//             "content": {
//               "application/json": {
//                 "schema": {
//                   "$ref": "#/components/schemas/signup"
//                 }
//               }
//             }
//           },
//           "responses": {
//             "200": {
//               "description": "Usuario registrado correctamente"
//             },
//             "400": {
//               "description": "Error en los datos enviados"
//             },
//             "500": {
//               "description": "Error en el servidor"
//             }
//           }
//         }
//       }
//     }
//   }
