import Joi from 'joi';
import mongoose from 'mongoose';

const documentSchema = mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 255
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
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

// eslint-disable-next-line one-var
const Document = mongoose.model('Document', documentSchema);

function validateDocument(document) {
    const Schema = {
        ownerId: Joi.ObjectId().required(),
        title: Joi.string()
            .max(255)
            .required(),
        content: Joi.string().required(),
        access: Joi.string().required(),
        createdAt: Joi.Date(),
        modifiedAt: Joi.Date()
    };

    return Joi.validate(document, Schema);
}
export { Document, validateDocument };
