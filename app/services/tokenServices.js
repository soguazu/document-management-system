import Token from '../models/token';

const services = {};

services.postToken =  async (reqToken) => {
    const token = new Token({
        token: reqToken
    });

    const result = await token.save();
    result.then((token) => { 
        if (token) return true;

        return false;
    });
    return true;
};

services.deleteToken = async (reqToken) => {
    await Token.deleteOne({
        token: reqToken 
    }, (error) => {
        console.log(error);
        return error;
    });

};

export default services;