/* eslint-disable no-undef */
import 'babel-polyfill';

import chai from 'chai';
import chaiHttp from 'chai-http';
import auth from '../../app/middleware/auth';
import sinon from 'sinon';
chai.use(chaiHttp);
chai.should();

describe.skip('Authentication Middleware', () => {
    const getToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2I4YzJkMjg4YTNlNjA1ODIyZTA5YTEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NTU2MTIzNzAsImV4cCI6MTM0NDA0OTEwMzYxOTczOTcwfQ.Y08bXPo8GLe912X4NdUFu7ulHao0UriFpg0ZtTwxuK8';

    let request = {
        header: sinon.stub().returns('x-auth-token')
    };
    let response = {
        status: () => {
            return this;
        },
        send: () => {
            console.log('sent successfully');
            return this;
        }
    };

    // const mockSend = sinon.stub(response, 'send');
    let nextCalled = false;
    let next = () => (nextCalled = true);
    it('should authenticate a user', () => {
        request.header['x-auth-token'] = getToken;
        auth(request, response, next);
        nextCalled.should.be.true;
    });
});
