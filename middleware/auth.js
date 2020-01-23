const jwt = require('jsonwebtoken');
const config = require('../config/config');

function auth (req, res, next){
    const token_header = req.headers.auth;
    if (!token_header) return res.status(401).send({ error: 'Token não enviado!' });

    jwt.verify(token_header, config.jwt_private, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Token Inválido!' });
        res.locals.auth_data=decoded;
        return next();
    });

}

module.exports = auth;