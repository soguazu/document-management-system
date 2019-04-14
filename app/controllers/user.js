import httpStatus from 'http-status-codes';

import { validateUser } from '../models/user';
import userSerices from '../services/userServices';
import helpers from '../helpers/util';

const user = {};

user.create = async (request, response) => {
    const { error } = validateUser(request.body);
    if (error) {
        return response
            .status(httpStatus.BAD_REQUEST)
            .send(error.details[0].message);
    }

    const isTaken = await helpers.isEmailUnique(request.body.email);

    if (!isTaken) {
        try {
            const user = await userSerices.post(request.body);
            return response.send(user);
        } catch (exception) {
            return response
                .status(httpStatus.BAD_REQUEST)
                .send('Username already taken');
        }
    }

    response.status(httpStatus.BAD_REQUEST).send('Username already taken');
};

user.getAll = async (request, response) => {
    //Validate the payload
    const { error } = validateUser(request.body);

    if (error) {
        return response
            .status(httpStatus.BAD_REQUEST)
            .send(httpStatus.getStatusText(httpStatus.BAD_REQUEST));
    }

};

user.getOne = async (request, response) => {};

user.update = async (request, response) => {};

user.delete = async (request, response) => {};

export default user;
