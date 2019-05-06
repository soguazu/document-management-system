/* eslint-disable no-undef */
import 'babel-polyfill';

import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import admin from '../../app/middleware/admin';
chai.use(chaiHttp);
chai.should();

describe('Middleware', () => {
    it('should call the next method if user is admin', () => {
        const request = {
            user: {
                role: 'admin'
            }
        };

        const response = {};

        const next = sinon.spy();

        admin(request, response, next);
        next.calledOnce.should.be.true;
    });

    it('should return response with bad request', () => {
        const request = {
            user: {
                role: 'user'
            }
        };

        const response = {
            status: function() {
                return this;
            },
            send: function() {
                console.log('send method');
            }
        };

        const next = () => console.log('next function called');

        admin(request, response, next);
    });
});
