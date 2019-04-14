import jwt from 'jsonwebtoken';
import httpStatus from 'http-status-codes';

import config from '../../config';

const auth = (request, response, next) => {
    const token = request.header('x-auth-token');

    if (!token) {
        //401 if user is not already logged in
        return response
            .status(httpStatus.UNAUTHORIZED)
            .send(httpStatus.getStatusText(httpStatus.UNAUTHORIZED));
    }

    try {
        const decrypted = jwt.verify(token, config.hashingSecret);
        request.user = decrypted;
        next();
    } catch (exception) {
        //400 if token is bad
        response
            .status(httpStatus.BAD_REQUEST)
            .send(httpStatus.getStatusText(httpStatus.BAD_REQUEST));
    }
};

export default auth;
