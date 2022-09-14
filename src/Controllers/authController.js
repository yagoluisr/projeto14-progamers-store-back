import mongo from '../db/db.js';



let db = await mongo();

function signIn (req, res) {
    db.collection('users').find().toArray();

    res.status(200).send('OK')
}

export { signIn }