const { body, validationResult, check, oneOf } = require('express-validator');
const { validarCampos } = require('./validarCampos');
const { emailExists, usernameExists } = require('../helpers/emailExists');
const UserService = require('../services/userService');


const validarRegistro = () => {
    const UserServ = new UserService();
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


const validateUpdateUser = () => {
    const validaciones = [
        body('firstName').not().isEmpty().withMessage('El nombre es obligatorio').bail().isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres').isAlpha('es-ES', { ignore: ' ' }).withMessage('El nombre solo puede contener letras'),
        // Last name
        body('lastName').not().isEmpty().withMessage('El nombre es obligatorio').bail().isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres').isAlpha('es-ES', { ignore: ' ' }).withMessage('El nombre solo puede contener letras'),
        //password
        body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres').matches(/\d/).withMessage('La contraseña debe contener al menos un número').matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una mayúscula').matches(/[a-z]/).withMessage('La contraseña debe contener al menos una minúscula').matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('La contraseña debe contener al menos un caracter especial'),
        //Email
        // body('email').not().isEmpty().withMessage('El email es obligatorio').bail().isEmail().withMessage('El email no es válido').bail().custom(emailExists),
        //username
        // body('username').not().isEmpty().withMessage('El nombre de usuario es obligatorio').bail().isLength({ min: 3 }).withMessage('El nombre de usuario debe tener al menos 3 caracteres').bail().isAlphanumeric('es-ES', { ignore: ' ' }).withMessage('El nombre de usuario solo puede contener letras y números').custom(usernameExists),

        //phone
        body('phone').not().isEmpty().withMessage('El teléfono es obligatorio').bail().isLength({ min: 10 }).withMessage('El teléfono debe tener al menos 10 caracteres').isNumeric().withMessage('El teléfono solo puede contener números'),

        //address
        body('address').not().isEmpty().withMessage('La dirección es obligatoria').bail().isLength({ min: 3 }).withMessage('La dirección debe tener al menos 3 caracteres'),

        //gender
        body('gender').not().isEmpty().withMessage('El género es obligatorio').bail().isLength({ min: 3 }).withMessage('El género debe tener al menos 3 caracteres'),

        //birthDate
        body('birthDate').not().isEmpty().withMessage('La fecha de nacimiento es obligatoria').bail().isLength({ min: 3 }).withMessage('La fecha de nacimiento debe tener al menos 3 caracteres').isDate().withMessage('La fecha de nacimiento debe ser una fecha válida'),

        //countryId
        // body('countryId').not().isEmpty().withMessage('El país es obligatorio').bail().isLength({ min: 3 }).withMessage('El país debe tener al menos 3 caracteres'),

        // city
        body('city').not().isEmpty().withMessage('La ciudad es obligatoria').bail().isLength({ min: 3 }).withMessage('La ciudad debe tener al menos 3 caracteres'),

        //category
        body('category').not().isEmpty().withMessage('La categoría es obligatoria').bail().isLength({ min: 3 }).withMessage('La categoría debe tener al menos 3 caracteres'),


        validarCampos
    ]

    return validaciones
}

module.exports = {
    validarRegistro,
    validateUpdateUser,
}
