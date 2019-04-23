/* eslint-disable no-undef */
import 'babel-polyfill';

// import sinon from 'sinon';
// import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
chai.should();

import app from '../../server';
import { User } from '../../app/models/user';

describe('User', () => {
    let token;

    beforeEach('Remove all data in user DB', function(done) {
        User.remove({}, function() {
            done();
        });
    });

    before('set token', function(done) {
        token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2JiNDgxMWVjZmI2NjM2ODRiZGFhMDAiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NTU3Nzc1NjF9.6-psbETo90t8r4FcmKsZQBzibLsffJB7lz7NZ41hSv4';

        done();
    });
    describe('/POST users', function() {
        it('should not create a user without a email address,name,password,role', function() {
            let user = {
                username: 'soguazu',
                name: {
                    firstname: 'grey',
                    lastname: 'white'
                },
                role: 'user',
                password: 'Livina1604'
            };

            chai.request(app)
                .post('/api/users')
                .set('x-auth-token', token)
                .send(user)
                .end(function(error, response) {
                    response.should.have.status(400);
                    response.body.should.be.an('object');
                });
        });

        it('should create a user if the listed payload is provided a email address,name,password,role', function() {
            let user = {
                username: 'soguazu',
                email: 'grey9@gmail.com',
                name: {
                    firstname: 'grey',
                    lastname: 'white'
                },
                role: 'user',
                password: 'Livina1604'
            };

            chai.request(app)
                .post('/api/users')
                .set('x-auth-token', token)
                .send(user)
                .end(function(error, response) {
                    response.should.have.status(200);
                    response.body.should.be.an('object');
                    response.body.name.should.have.property('firstname');
                    response.body.name.should.have.property('lastname');
                    response.body.should.have.property('email');
                    response.body.username.should.equal('soguazu');
                });
        });
    });

    describe('GET user', () => {
        it('should return all users', done => {
            chai.request(app)
                .get('/api/users')
                .set('x-auth-token', token)
                .end(function(error, response) {
                    response.should.have.status(200);
                    response.body.should.be.an('array');
                    response.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('PUT user/:id', () => {
        it('should update the user with the given id', done => {
            let user = new User({
                username: 'greywhite',
                name: {
                    firstname: 'stanley',
                    lastname: 'white'
                },
                email: 'stan@gmail.com',
                password: 'Livina1604',
                role: 'admin'
            });
            user.save(function(error, user) {
                chai.request(app)
                    .put('/api/users/' + user._id)
                    .set('x-auth-token', token)
                    .send({
                        username: 'greyyellow',
                        name: {
                            firstname: 'john',
                            lastname: 'doe'
                        },
                        email: 'sog@gmail.com',
                        password: 'Livina1604',
                        role: 'admin'
                    })
                    .end(function(error, response) {
                        response.should.have.status(200);
                        done();
                    });
            });
        });
    });

    describe('GET user/:id', () => {
        it('should delete the user with the given id', done => {
            let user = new User({
                username: 'greywhite',
                name: {
                    firstname: 'stanley',
                    lastname: 'white'
                },
                email: 'stan@gmail.com',
                password: 'Livina1604',
                role: 'admin'
            });
            user.save(function(error, user) {
                chai.request(app)
                    .get('/api/users/' + user._id)
                    .set('x-auth-token', token)
                    .end(function(error, response) {
                        response.should.have.status(200);
                        response.body.name.lastname.should.equal('white');
                        done();
                    });
            });
        });
    });

    describe('DELETE user/:id', () => {
        it('should update the user with the given id', done => {
            let user = new User({
                username: 'greywhite',
                name: {
                    firstname: 'stanley',
                    lastname: 'white'
                },
                email: 'stan@gmail.com',
                password: 'Livina1604',
                role: 'admin'
            });
            user.save(function(error, user) {
                chai.request(app)
                    .delete('/api/users/' + user._id)
                    .set('x-auth-token', token)
                    .end(function(error, response) {
                        response.should.have.status(200);
                        done();
                    });
            });
        });
    });
});
