/* eslint-disable no-undef */
import 'babel-polyfill';
import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
chai.should();

import app from '../../server';
import config from '../../config';
import { Document } from '../../app/models/document';

describe('DOCUMENTS', () => {
    let token, user;
    beforeEach(function(done) {
        Document.remove({}, function(error) {
            if (error) {
                done(error);
            }
        });
    });

    before('set token', function(done) {
        token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2JiNDgxMWVjZmI2NjM2ODRiZGFhMDAiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NTU3Nzc1NjF9.6-psbETo90t8r4FcmKsZQBzibLsffJB7lz7NZ41hSv4';

        done();
    });
    describe('/POST document', () => {
        it('should create a new document if required fields are passed', done => {
            const decrypted = jwt.verify(token, config.hashingSecret);
            user = decrypted;

            const document = {
                ownerId: user._id,
                title: 'Lies in Circle',
                doType: 'friction',
                content: 'testing',
                access: 'private'
            };

            chai.request(app)
                .post('/api/documents')
                .set('x-auth-token', token)
                .send(document)
                .end(function(error, response) {
                    response.should.have.status(200);
                    done();
                });
        });
    });
});
