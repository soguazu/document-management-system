/* eslint-disable no-undef */

let mongoose = require('mongoose');

let { User } = require('../app/models/user');
let bcrypt = require('bcrypt');

mongoose
    .connect(
        'mongodb+srv://grey123:grey123@dmscluster-evk9t.mongodb.net/dms?retryWrites=true',
        {
            useNewUrlParser: true,
            useCreateIndex: true
        }
    )
    .then(() => console.log('Database connected successfully'));
hashPassword().then(password => {
    let users = [
        new User({
            username: 'greywhite',
            name: {
                firstname: 'Grey',
                lastname: 'White'
            },
            email: 'admin@gmail.com',
            password: password,
            role: 'Admin'
        }),
        new User({
            username: 'darelawal',
            name: {
                firstname: 'Dare',
                lastname: 'Lawal'
            },
            email: 'dare@gmail.com',
            password: password,
            role: 'User'
        }),
        new User({
            username: 'kazeemLanre',
            name: {
                firstname: 'Kazeem',
                lastname: 'Lanre'
            },
            email: 'admin@gmail.com',
            password: password,
            role: 'Guest'
        })
    ];

    let done = 0;
    for (let i = 0; i < users.length; i++) {
        users[i].save(function() {
            done++;
            if (done === users.length) {
                exit();
            }
        });
    }

    function exit() {
        mongoose.disconnect();
    }
});

async function hashPassword() {
    const salt = await bcrypt.genSalt(10);
    let password = await bcrypt.hash('Livina1604', salt);
    return password;
}
