import httpStatus from 'http-status-codes';

import { validateUser } from '../models/user';
import userServices from '../services/userServices';
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
            const user = await userServices.post(request.body);
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
    const users = await userServices.getAll();

    response.send(users);
};

user.getOne = async (request, response) => {
    const user = await userServices.getById(request.params.id);
    if (!user) {
        return response
            .status(httpStatus.NOT_FOUND)
            .send(httpStatus.getStatusText(httpStatus.NOT_FOUND));
    }

    return response.send(user);
};

user.update = async (request, response) => {
    const user = await userServices.update(request.params.id, request.body);

    if (!user) {
        return response
            .status(httpStatus.NOT_FOUND)
            .send(httpStatus.getStatusText(httpStatus.NOT_FOUND));
    }
    response.send(user);
};

user.delete = async (request, response) => {
    const user = await userServices.delete(request.params.id);
    if (!user) {
        return response
            .status(httpStatus.NOT_FOUND)
            .send(httpStatus.getStatusText(httpStatus.NOT_FOUND));
    }
    return response.send('Deleted successfully');
};

export default user;
