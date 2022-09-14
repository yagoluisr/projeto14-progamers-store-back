import mongo from '../db/db.js';
import bcrypt from 'bcrypt';


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

export { signUp }