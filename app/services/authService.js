import {User} from '../models/user';


const services = {};



services.getOnebyEmail = async (payload) => {
    const user = await User.findOne({email: payload});
    return user;
};

export default services;