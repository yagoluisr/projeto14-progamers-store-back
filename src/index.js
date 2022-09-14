import express from 'express';
import cors from 'cors';
import mongo from './db/db.js';


const app = express();
app.use(cors());
app.use(express.json());

let db = await mongo();


app.get('/status', (req, res) => {
    db.collection('users').find().toArray();

    res.status(200).send('OK')
})


app.listen(5000, () => {
    console.log('Listening on port 5000')
})
