import Joi from 'joi';


const helpers = {};

helpers.authValidate = (request) => {
    const schema = {
        'email': Joi.string().min(5).max(255).required().email(),
        'password': Joi.string().regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/).required()
    };
    return Joi.validate(request, schema);
};


export default helpers;