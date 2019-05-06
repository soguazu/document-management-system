import { Role } from '../models/role';

const services = {};

services.post = async payload => {
    let role = new Role({
        title: payload.title
    });

    const savedRole = await role.save();
    return savedRole;
};

services.getAll = async () => {
    const roles = await Role.find({});
    return roles;
};

services.getByTitle = async title => {
    const role = await Role.findOne({ title: title });
    return role;
};

services.getById = async id => {
    const role = await Role.findById(id);
    return role;
};

services.update = async (id, payload) => {
    const role = await Role.findOneAndUpdate(
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

    return role;
};

services.delete = async id => {
    const role = await Role.findOneAndDelete(id);
    return role;
};

export default services;
