/* eslint-disable no-undef */
let mongoose = require('mongoose');

let { Role } = require('../app/models/role');

mongoose
    .connect(
        'mongodb+srv://grey123:grey123@dmscluster-evk9t.mongodb.net/dms?retryWrites=true',
        {
            useNewUrlParser: true,
            useCreateIndex: true
        }
    )
    .then(() => console.log('Database connected successfully'));

let roles = [
    new Role({
        title: 'Admin'
    }),
    new Role({
        title: 'User'
    }),
    new Role({
        title: 'Guest'
    }),
    new Role({
        title: 'Role'
    }),
    new Role({
        title: 'Assistant'
    })
];

let done = 0;
for (let i = 0; i < roles.length; i++) {
    roles[i].save(function() {
        done++;
        if (done === roles.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
