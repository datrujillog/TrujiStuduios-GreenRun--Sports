const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../configs/config").config;

function authValidation(req, res, next) {
    const bearer = req.headers.authorization;

    if (bearer && bearer.startsWith("Bearer ")) {
        const token = bearer.split("Bearer ")[1]; // Obtener el token usando split

        if (token) {
            try {
                const decoded = jwt.verify(token, jwtSecret);
                req.user = decoded;
                return next();
            } catch ({ message, name }) {
                return res.status(401).json({
                    error: true,
                    message,
                    type: name,
                });
            }
        }
    }

    return res.status(401).json({
        error: true,
        message: "Insufficient permissions",
    });
}

function adminValidation(req, res, next) {
    if (req.user.role === "admin") {
        return next();
    }

    return res.status(401).json({
        error: true,
        message: "Insufficient permissions",
    });
}

function userValidation(req, res, next) {
    if (req.user.role === "user") {
        return next();
    }

    return res.status(401).json({
        error: true,
        message: "Insufficient permissions",
    });
}

function authMiddleware(type) {
    let middlewares;
    if (type === "user") {
        middlewares = [authValidation, userValidation];
    } else if (type === "admin") {
        middlewares = [authValidation, adminValidation];
    }

    return middlewares;
}

module.exports = authMiddleware;
