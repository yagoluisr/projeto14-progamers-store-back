import mongo from '../db/db.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

let db = await mongo();

async function signUp (req, res) {
    const { name, email, password } = res.locals.user

    try {
        const user = await db.collection('users').findOne({email});

        if(user) return res.status(409).send('Já existe um usuário com esse e-mail');

        const passwordHash = bcrypt.hashSync(password, 10);

        db.collection('users').insertOne(
            {
                name,
                email,
                password: passwordHash
            }
        );

        res.status(201).send('OK');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function signIn (req, res) {
    const { email, password } = res.locals.user;

    try {
        const user = await db.collection('users').findOne({email});

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();

            await db.collection('sessions').insertOne({
                name: user.name,
                email,
                token
            });

            return res.status(200).send(token);
        } 
        
        res.status(404).send('E-mail e/ou senha inválido');
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export { signUp, signIn }