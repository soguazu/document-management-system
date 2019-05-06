/* eslint-disable no-undef */
// import Joi from 'joi';
// import jwt from 'jsonwebtoken';
// import mongoose from 'mongoose';
// import config from '../../config';

let Joi = require('joi');
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let config = require('../../config');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: Object,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    role: {
        type: String,
        required: true
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { _id: this._id, role: this.role },
        config.hashingSecret
    );

    return token;
};

// eslint-disable-next-line one-var
const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const Schema = {
        username: Joi.string().required(),
        name: Joi.object().keys({
            firstname: Joi.string()
                .min(3)
                .required(),
            lastname: Joi.string()
                .min(3)
                .required()
        }),
        email: Joi.string()
            .min(5)
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/)
            .required(),
        role: Joi.string().required()
    };

    return Joi.validate(user, Schema);
}
// export { User, validateUser };
module.exports = { User, validateUser };
