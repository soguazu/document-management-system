import {User} from '../models/user';


const services = {};



services.getOnebyEmail = async (payload) => {
    const user = await User.findOne({payload: payload});
    if (!user) {
        return user;
    }
    return false;
};

export default services;