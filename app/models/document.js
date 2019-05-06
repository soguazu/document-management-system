/* eslint-disable no-undef */
// import Joi from 'joi';
// import mongoose from 'mongoose';
let Joi = require('joi');
let mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 255
    },
    docType: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    access: {
        type: String,
        required: true,
        default: 'public'
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date
    },
    modifiedAt: {
        type: Date,
        required: true,
        default: Date
    }
});

// eslint-disable-next-line one-var
const Document = mongoose.model('Document', documentSchema);

function validateDocument(document) {
    const Schema = {
        title: Joi.string()
            .max(255)
            .required(),
        docType: Joi.string(),
        content: Joi.string().required(),
        access: Joi.string().required()
    };

    return Joi.validate(document, Schema);
}
// export { Document, validateDocument };
module.exports = { Document, validateDocument };
