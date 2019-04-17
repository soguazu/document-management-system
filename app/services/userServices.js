import bcrypt from 'bcrypt';
import _ from 'lodash';
import { User } from '../models/user';

const services = {};

services.post = async payload => {
    let user = new User({
        username: payload.username,
        name: payload.name,
        email: payload.email,
        password: payload.password,
        role: payload.role
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const savedUser = await user.save();

    if (savedUser) {
        return _.pick(user, ['username', 'name', 'email', 'role']);
    }
    return false;
};

services.getAll = async () => {
    const users = await User.find({});
    return users;
};

services.getByEmail = async email => {
    const user = await User.findOne({ email: email });
    return user;
};

services.getById = async id => {
    const user = await User.findById(id);
    return user;
};

services.update = async (id, payload) => {
    const user = await User.findOneAndUpdate(
        id,
        {
            username: payload.username,
            name: payload.name,
            email: payload.email,
            password: payload.password,
            role: payload.role
        },
        { new: true }
    );

    if (!user) {
        return user;
    }

    return user;
};

services.delete = async id => {
    const user = await User.findOneAndDelete(id);
    if (user) {
        return user;
    }

    return false;
};

export default services;
