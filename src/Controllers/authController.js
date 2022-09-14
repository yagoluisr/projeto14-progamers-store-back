import mongo from '../db/db.js';
import bcrypt from 'bcrypt';
import joi from 'joi';


const signUpSchema = joi.object({
    name: joi.string().empty().required(),
    email: joi.string().email().empty().required(),
    password: joi.string().empty().required()
})

let db = await mongo();

async function signUp (req, res) {
    const { name, email, password } = req.body;

    const validation = signUpSchema.validate({name,email,password}, {abortEarly: false})

    if (validation.error) {
        const error = validation.error.details.map(obj => obj.message)
        return res.status(404).send(error);   
    }

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