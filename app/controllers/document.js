import httpStatus from 'http-status-codes';

import { validateDocument } from '../models/document';
import documentServices from '../services/documentServices';
import helpers from '../helpers/util';

let document = {};

document.create = async (request, response) => {
    const { error } = validateDocument(request.body);

    if (error) {
        return response.status(httpStatus.BAD_REQUEST).send(error);
        // .send(httpStatus.getStatusText(httpStatus.BAD_REQUEST));
    }

    const document = await documentServices.post(request);
    if (document) {
        return response.send(document);
    }
    response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send(httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR));
};

document.getAll = async (request, response) => {
    const documents = await helpers[request.user.role](request);
    if (documents) {
        return response.send(documents);
    }
    return response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send(httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR));
};

document.getOne = async (request, response) => {
    const document = await documentServices.getById(request.params.id);

    if (
        document.owner == request.user._id ||
        document.access == 'public' ||
        request.user.role === 'admin'
    ) {
        return response.send(document);
    }
    return response
        .status(httpStatus.UNAUTHORIZED)
        .send(httpStatus.getStatusText(httpStatus.UNAUTHORIZED));
};

document.private = async (request, response) => {
    const documents = await documentServices.getPrivate(request);
    console.log(request.user);
    console.log(documents);
    if (documents) {
        return response.send(documents);
    }
    return response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send(httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR));
};

document.update = async (request, response) => {
    console.log(request.user);
    const document = await documentServices.update(
        request.params.id,
        request.body
    );

    if (!document) {
        return response
            .status(httpStatus.NOT_FOUND)
            .send(httpStatus.getStatusText(httpStatus.NOT_FOUND));
    }
    response.send(document);
};

document.delete = async (request, response) => {
    const document = await documentServices.delete(request.params.id);
    if (!document) {
        return response
            .status(httpStatus.NOT_FOUND)
            .send(httpStatus.getStatusText(httpStatus.NOT_FOUND));
    }
    return response.send('Deleted successfully');
};

document.getSearched = async (request, response) => {
    const documents = await documentServices.search(request.query.key);
    if (!documents) {
        return response
            .status(httpStatus.NOT_FOUND)
            .send(httpStatus.getStatusText(httpStatus.NOT_FOUND));
    }
    return response.send(documents);
};

export default document;
