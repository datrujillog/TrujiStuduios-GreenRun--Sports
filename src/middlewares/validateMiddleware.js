const { body, validationResult, check, oneOf } = require('express-validator');
const { validarCampos } = require('./validarCampos');
const { emailExists, usernameExists } = require('../helpers/emailExists');


const validarRegistro = () => {
    const validaciones = [
        // First name
        body('firstName').not().isEmpty().withMessage('El nombre es obligatorio').bail().isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres').isAlpha('es-ES', { ignore: ' ' }).withMessage('El nombre solo puede contener letras'),

        // Last name
        body('lastName').not().isEmpty().withMessage('El nombre es obligatorio').bail().isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres').isAlpha('es-ES', { ignore: ' ' }).withMessage('El nombre solo puede contener letras'),

        //password
        body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres').matches(/\d/).withMessage('La contraseña debe contener al menos un número').matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una mayúscula').matches(/[a-z]/).withMessage('La contraseña debe contener al menos una minúscula').matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('La contraseña debe contener al menos un caracter especial'),

        //Email
        body('email').not().isEmpty().withMessage('El email es obligatorio').bail().isEmail().withMessage('El email no es válido').bail().custom(emailExists),

        //username
        body('username').not().isEmpty().withMessage('El nombre de usuario es obligatorio').bail().isLength({ min: 3 }).withMessage('El nombre de usuario debe tener al menos 3 caracteres').bail().isAlphanumeric('es-ES', { ignore: ' ' }).withMessage('El nombre de usuario solo puede contener letras y números').custom(usernameExists),
 
        validarCampos
    ] 

    return validaciones
}

const validarLogin = () => {
    const validaciones = [
        body('email', 'El email es obligatorio').not().isEmpty(),
        body('email', 'El email no es válido').isEmail(),
        body('password', 'La contraseña es obligatoria').not().isEmpty(),
        body('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    ]
}

const validarActualizarUsuario = () => {
    const validaciones = [
        body('firstName', 'El nombre es obligatorio').not().isEmpty(),
        body('lastName', 'El apellido es obligatorio').not().isEmpty(),
        body('email', 'El email es obligatorio').not().isEmpty(),
        body('email', 'El email no es válido').isEmail(),
        body('phone', 'El teléfono es obligatorio').not().isEmpty(),
        body('address', 'La dirección es obligatoria').not().isEmpty(),
    ]
}

module.exports = {
    validarRegistro,
    validarLogin,
    validarActualizarUsuario,
    validarCampos
}
