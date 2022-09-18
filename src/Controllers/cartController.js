import mongo from '../db/db.js';


let db = await mongo();

async function purchases(req, res) {
    const { username, adress, amount, date, products } = res.locals.purchase;

    try {
        await db.collection('purchases').insertOne({
            username,
            adress,
            amount,
            date,
            products
        });
        
        res.status(200).send('OK');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export { purchases }