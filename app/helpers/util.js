import Joi from 'joi';
import userServices from '../services/userServices';
import roleServices from '../services/roleServices';
import documentServices from '../services/documentServices';

const helpers = {};

helpers.authValidate = request => {
    const schema = {
        email: Joi.string()
            .min(5)
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/)
            .required()
    };
    return Joi.validate(request, schema);
};

helpers.isEmailUnique = email => {
    const user = userServices.getByEmail(email);
    return user;
};

helpers.isTitleUnique = title => {
    const role = roleServices.getByTitle(title);
    return role;
};

helpers.admin = async request => {
    const documents = await documentServices.getAllDocsForAdmin(request);
    return documents;
};

helpers.user = async request => {
    const documents = await documentServices.getAllDocsForUser(request);
    return documents;
};

helpers.guest = async request => {
    const documents = await documentServices.getAllDocsForGuest(request);
    return documents;
};

export default helpers;
