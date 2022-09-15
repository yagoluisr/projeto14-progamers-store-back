import joi from 'joi';


const signUpSchema = joi.object({
    name: joi.string().empty().required(),
    email: joi.string().email().empty().required(),
    password: joi.string().empty().required()
});

const signInSchema = joi.object({
    email: joi.string().email().empty().required(),
    password: joi.string().empty().required()
});


function schemaSignUp (req, res, next) {
    const { name, email, password } = req.body;

    const validation = signUpSchema.validate({name,email,password}, {abortEarly: false})

    if (validation.error) {
        const error = validation.error.details.map(obj => obj.message)
        return res.status(404).send(error);   
    }

    res.locals.user = { name, email, password }
    next()
}

function schemaSignIn (req, res, next) {
    const { email, password } = req.body;

    const validation = signInSchema.validate({email, password}, {abortEarly: false});

    if (validation.error) {
        const error = validation.error.details.map(obj => obj.message);
        return res.status(404).send(error);
    }

    res.locals.user = { email, password }
    next()
}

export { schemaSignUp, schemaSignIn };