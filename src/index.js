import express from 'express';
import cors from 'cors';
import productRoute from './Routers/productRoute.js'
import authRouter from './Routers/authRouters.js'
import { schemaSignIn, schemaSignUp } from './Middlewares/authMiddleware.js';

const app = express();

app.use(cors());
app.use(express.json());

//Rotas de autenticação
app.post('/sign-up', schemaSignUp, authRouter);
app.post('/',schemaSignIn ,authRouter);
app.use(productRoute);


app.listen(5000, () => {
    console.log('Listening on port 5000');
});
