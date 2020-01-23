const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, (req, res, next) => {
    try {
        console.log(res.locals.auth_data);
        return res.send({ message: 'Informação muito importante só retornada se autenticado o token passado!' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Erro na ao acessar vida GET o contexto Raiz!' });
    }
    // return res.send({ message : 'Tudo OK com o método GET da rota Raiz!' });
});

router.post('/', (req, res) => {
    try {
        return res.send({ message: 'Tudo OK com o método POST da rota Raiz!' });
    } catch (error) {
        return res.status(500).send({error:'Erro ao acessar via POST o contexto Raiz!'});
    }
});

module.exports = router;