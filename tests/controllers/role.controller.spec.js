/* eslint-disable no-undef */
import 'babel-polyfill';

import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
chai.should();

import app from '../../server';
import { Role } from '../../app/models/role';

describe('ROLE', () => {
    let token;

    beforeEach('clean role db', function(done) {
        Role.remove({}, function() {
            done();
        });
    });

    before('set token', function(done) {
        token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2JiNDgxMWVjZmI2NjM2ODRiZGFhMDAiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NTU3Nzc1NjF9.6-psbETo90t8r4FcmKsZQBzibLsffJB7lz7NZ41hSv4';

        done();
    });

    describe('/POST roles', () => {
        it('should create a new role with unique title', done => {
            const role = {
                title: 'Admin'
            };

            chai.request(app)
                .post('/api/roles')
                .set('x-auth-token', token)
                .send(role)
                .end(function(error, response) {
                    response.should.have.status(200);
                    response.body.title.should.be.equal('Admin');
                    done();
                });
        });

        describe('/GET role', () => {
            it('should return all roles only if user is admin', done => {
                chai.request(app)
                    .get('/api/roles')
                    .set('x-auth-token', token)
                    .end(function(error, response) {
                        response.should.have.status(200);
                        done();
                    });
            });
        });

        describe('/GET role/:id', () => {
            it('should return a single role with the given id, only if user is admin', done => {
                let role = new Role({
                    title: 'User'
                });

                role.save(function(error, savedRole) {
                    chai.request(app)
                        .get('/api/roles/' + savedRole._id)
                        .set('x-auth-token', token)
                        .end(function(error, response) {
                            response.should.have.a.status(200);
                            response.body.title.should.equal('User');
                            done();
                        });
                });
            });
        });

        describe('/PUT role/:id', () => {
            it('should update the role with the given id', done => {
                let role = new Role({
                    title: 'User'
                });
                role.save(function(error, role) {
                    chai.request(app)
                        .put('/api/roles/' + role._id)
                        .set('x-auth-token', token)
                        .send({
                            title: 'Guest'
                        })
                        .end(function(error, response) {
                            response.should.have.status(200);
                            done();
                        });
                });
            });
        });

        describe('/DELETE role/:id', () => {
            it('should update the role with the given id', done => {
                let role = new Role({
                    title: 'User'
                });
                role.save(function(error, role) {
                    chai.request(app)
                        .delete('/api/roles/' + role._id)
                        .set('x-auth-token', token)
                        .end(function(error, response) {
                            response.should.have.status(200);
                            done();
                        });
                });
            });
        });
    });
});
