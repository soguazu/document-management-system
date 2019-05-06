import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import authServices from '../services/authServices';
import helpers from '../helpers/util';
import httpStatus from 'http-status-codes';

let authentication = {};

// Login controller
authentication.login = async (request, response) => {
    //Calling a helper function to validate parameters passed through the body
    const { error } = helpers.authValidate(request.body);

    //Checking if there was any error
    if (error) {
        return response
            .status(httpStatus.BAD_REQUEST)
            .send(error.details[0].message);
    }

    //Checking if email already exist
    const user = await authServices.getOnebyEmail(request.body.email);

    if (!user) {
        return response
            .status(httpStatus.BAD_REQUEST)
            .send('Invalid username or password1');
    }

    //Validating if passwords match
    const validPassword = await bcrypt.compare(
        request.body.password,
        user.password
    );

    if (!validPassword) {
        return response
            .status(httpStatus.BAD_REQUEST)
            .send('Invalid username or password2');
    }

    //Generating token if login was successfully
    const token = user.generateAuthToken();

    //Validating that token was saved successfully
    if (token) {
        return response.header('x-auth-token', token).send(token);
    }

    return response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send(httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR));
};

// logout controller
authentication.logout = async (request, response) => {
    response.send('logged out successfully');
};

export default authentication;
