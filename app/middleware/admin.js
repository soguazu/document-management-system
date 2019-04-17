import httpStatus from 'http-status-codes';

const admin = (request, response, next) => {

    // If user is not admin return status code403
    if (request.user.role !== 'admin') {
        response
            .status(httpStatus.FORBIDDEN)
            .send(httpStatus.getStatusText(httpStatus.FORBIDDEN));
    }

    next();
};

export default admin;
