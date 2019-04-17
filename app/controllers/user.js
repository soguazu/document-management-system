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
    const users = await userSerices.getAll();
    if (!users) {
        response
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send(httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR));
    }

    response.send(users);
};

user.getOne = async (request, response) => {
    const user = await userSerices.getById(request.params.id);
    if (!user) {
        return response
            .status(httpStatus.NOT_FOUND)
            .send(httpStatus.getStatusText(httpStatus.NOT_FOUND));
    }

    return response.send(user);
};

user.update = async (request, response) => {
    const user = await userSerices.update(request.params.id, request.body);

    if (!user) {
        return response
            .status(httpStatus.NOT_FOUND)
            .send(httpStatus.getStatusText(httpStatus.NOT_FOUND));
    }
    response.send(user);
};

user.delete = async (request, response) => {
    const user = await userSerices.delete(request.params.id);
    if (!user) {
        return response
            .status(httpStatus.NOT_FOUND)
            .send(httpStatus.getStatusText(httpStatus.NOT_FOUND));
    }
    return response.send('Deleted successfully');
};

export default user;
