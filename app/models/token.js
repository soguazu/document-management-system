import mongoose from 'mongoose';
import Joi from 'joi';

const tokenSchema = mongoose.Schema({
    token: {
        type: String
    }
});

const Token = mongoose.model('Token', tokenSchema);

function validate(token) {
    const Schema = {
        'token': Joi.string().required()
    };

    Joi.validate(token, Schema);
}

export { Token, validate };
