const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, (req, res) => {
    return res.send({ message : 'Tudo OK com o método GET da rota Raiz!' });
});

router.post('/', auth, (req, res) => {
    return res.send({ message : 'Tudo OK com o método POST da rota Raiz!' });
});

module.exports = router;