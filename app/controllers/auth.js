import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import authServices from '../services/authService';
import tokenServices from '../services/tokenServices';
import helpers from '../helpers/util';
import httpStatus from 'http-status-codes';

const authentication = {};


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

    //Save the token in a Database so as to blacklist some token when user logs out
    const archivedToken = tokenServices.postToken(token);

    //Validating that token was saved successfully
    if (archivedToken) {
        return response.header('x-auth-token', token).send('Logged in successfully');
    }

    return response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send(httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR));
};




// logout controller
authentication.logout = async (request, response) => {
    const token = request.header('x-auth-token');
    const error = await tokenServices.deleteToken(token);
    if (!error) {
        return response.send('Logged out successfully');
    }

    return response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send(httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR));
};

export default authentication;
