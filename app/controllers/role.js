import httpStatus from 'http-status-codes';
import { validateRole } from '../models/role';
import roleServices from '../services/roleServices';
import helpers from '../helpers/util';

let role = {};

role.create = async (request, response) => {
    const { error } = validateRole(request.body);
    if (error) {
        return response
            .status(httpStatus.BAD_REQUEST)
            .send(httpStatus.getStatusText(httpStatus.BAD_REQUEST));
    }

    const isTaken = await helpers.isTitleUnique(request.body.title);
    if (!isTaken) {
        try {
            const role = await roleServices.post(request.body);
            return response.send(role);
        } catch (ex) {
            return response
                .status(httpStatus.BAD_REQUEST)
                .send('Title already taken');
        }
    }
    return response.status(httpStatus.BAD_REQUEST).send('Title already taken');
};

role.getAll = async (request, response) => {
    const roles = await roleServices.getAll();

    response.send(roles);
};

role.getOne = async (request, response) => {
    const role = await roleServices.getById(request.params.id);

    if (!role) {
        return response
            .status(httpStatus.NOT_FOUND)
            .send(httpStatus.getStatusText(httpStatus.NOT_FOUND));
    }

    return response.send(role);
};

role.update = async (request, response) => {
    const role = await roleServices.update(request.params.id, request.body);

    if (!role) {
        return response
            .status(httpStatus.NOT_FOUND)
            .send(httpStatus.getStatusText(httpStatus.NOT_FOUND));
    }
    response.send(role);
};

role.delete = async (request, response) => {
    const role = await roleServices.delete(request.params.id);
    if (!role) {
        return response
            .status(httpStatus.NOT_FOUND)
            .send(httpStatus.getStatusText(httpStatus.NOT_FOUND));
    }
    return response.send('Deleted successfully');
};

export default role;
