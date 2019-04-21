/* eslint-disable no-undef */
import 'babel-polyfill';

import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
chai.should();

import app from '../../server';
import { User } from '../../app/models/user';

describe('Authentication', () => {
    beforeEach(function(done) {
        User.remove({}, function() {
            done();
        });
    });
    beforeEach(function(done) {
        let user = {
            username: 'admin',
            email: 'admin@gmail.com',
            name: {
                firstname: 'grey',
                lastname: 'white'
            },
            role: 'admin',
            password: 'Livina1604'
        };

        chai.request(app)
            .post('/api/users')
            .send(user)
            .end(function(error, response) {
                response.should.have.status(200);
                done();
            });
    });

    it('should authenticate user with correct login', done => {
        chai.request(app)
            .post('/api/auth')
            .send({ email: 'admin@gmail.com', password: 'Livina1604' })
            .end(function(error, response) {
                response.should.have.status(200);
                done();
            });
    });

    it('should logout a user', done => {
        chai.request(app)
            .post('/api/auth/signout')
            .send()
            .end(function(error, response) {
                response.should.have.status(200);
                done();
            });
    });
});
