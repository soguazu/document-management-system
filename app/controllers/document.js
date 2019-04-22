import httpStatus from 'http-status-codes';

import { validateDocument } from '../models/document';
import documentServices from '../services/documentServices';
import helpers from '../helpers/util';

let document = {};

document.create = (request, response) => {
    const { error } = validateDocument(request.body);

    if (error) {
        return response
            .status(httpStatus.BAD_REQUEST)
            .send(httpStatus.getStatusText(httpStatus.BAD_REQUEST));
    }
};
