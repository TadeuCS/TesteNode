const express = require('express');

const router = express.Router();
const Users = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

//funções auxiliares
const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, 'batatafrita2019', { expiresIn: '1H' });
}

// router.get('/', (req, res) => {
//     Users.find({}, (err, data) => {
//         if (err) return res.send({ error: 'Erro na consulta de usuarios!' });
//         return res.send(data);
//     });
// });

router.get('/', async (req, res) => {
    try {
        const data = await Users.find();
        return res.send(data);
    } catch (error) {
        console.log(error);
        return res.send({ error: 'Erro na consulta de Usuários!' });
    }
});

// router.post('/create', (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) return res.send({ message: 'Dados inválidos!' });

//     Users.findOne({ email }, (err, data) => {
//         if (err) return res.send({ error: 'Erro ao buscar o usuário!' });
//         if (data) return res.send({ error: 'Usuário já registrado!' });
//         Users.create(req.body, (err, data) => {
//             if (err) return res.send({ error: 'Erro ao salvar o usuário!' });

//             data.password = undefined;
//             return res.send(data);
//         });
//     })
// });




router.post('/create', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.send({ message: 'Dados inválidos!' });

    try {
        if (await Users.findOne({ email })) return res.send({ error: 'Usuário não registrado!' });
        const user = await Users.create(req.body);
        user.password = undefined;
    
        return res.send({user, token: createUserToken(user.id)});
    } catch (error) {
        return res.send({ error: 'Erro ao criar um usuário!' });
    }
});

// router.get('/auth', (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) return res.send({ error: 'Dados insuficientes!' });

//     Users.findOne({ email }, (err, data) => {
//         if (err) return res.send({ error: 'Erro ao buscar o usuário!' });
//         if (!data) return res.send({ error: 'Usuário não registrado!' });
//         bcrypt.compare(password, data.password, (err, same) => {
//             if (!same) return res.send({ error: 'Erro ao autenticar o usuário!' });
//             data.password = undefined;
//             return res.send(data);
//         })
//     }).select('+password');
// });

router.get('/auth', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.send({ error: 'Dados insuficientes!' });

    try {
        const user = await Users.findOne({ email }).select('+password');
        if (!user) return res.send({ error: 'Usuário não registrado!' });

        const pass_ok = await bcrypt.compare(password, user.password);
        if (!pass_ok) return res.send({ error: 'Erro ao autenticar o usuário!' });

        user.password = undefined;
        return res.send({user, token: createUserToken(user.id)});
    } catch (error) {
        console.log(error);
        return res.send({ error: 'Erro ao buscar o usuário!' });
    }
});

module.exports = router