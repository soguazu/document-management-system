/* eslint-disable no-undef */
import request from 'supertest';
import { should } from 'chai';
should();

import app from '../../server';


describe('Users', () => {
    describe('/GET', () => {
        it('should get all users', (done) => {
            request(app)
                .get('/api/auth')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
            done();
        });
    });
});