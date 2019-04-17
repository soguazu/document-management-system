import {Token} from '../models/token';

const services = {};

services.postToken =  async (reqToken) => {
    const token = new Token({
        token: reqToken
    });

    const result = await token.save();
    return result;
};

services.deleteToken = async (reqToken) => {
    await Token.deleteOne({
        token: reqToken
    }, (error) => {
        return error;
    });

};

export default services;