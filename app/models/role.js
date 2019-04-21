import Joi from 'joi';
import mongoose from 'mongoose';

const roleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
});

// eslint-disable-next-line one-var
const Role = mongoose.model('Role', roleSchema);

function validateRole(role) {
    const Schema = {
        title: Joi.string()
            .max(15)
            .required()
    };

    return Joi.validate(role, Schema);
}
export { Role, validateRole };
