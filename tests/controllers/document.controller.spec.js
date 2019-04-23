/* eslint-disable no-undef */
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
chai.should();

import app from '../../server';
import { Document } from '../../app/models/document';

describe('DOCUMENTS', () => {
    let token;
    beforeEach(function(done) {
        Document.remove({}, function(error) {
            if (error) {
                done(error);
            }
            done();
        });
    });

    before('set token', function(done) {
        token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2JiNDgxMWVjZmI2NjM2ODRiZGFhMDAiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NTU3Nzc1NjF9.6-psbETo90t8r4FcmKsZQBzibLsffJB7lz7NZ41hSv4';

        done();
    });
    describe('/POST document', () => {
        it('should create a new document if required fields are passed', done => {
            const document = {
                title: 'Lies in Circle',
                docType: 'friction',
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

    describe('/GET document', () => {
        it('should return all document that user has access to', done => {
            chai.request(app)
                .get('/api/documents')
                .set('x-auth-token', token)
                .end(function(error, response) {
                    response.should.have.status(200);
                    done();
                });
        });
    });

    describe('/GET document', () => {
        const newToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2JkZDQwNzE3MTMyNjhiMjQ3ZTBkMDYiLCJyb2xlIjoidXNlciIsImlhdCI6MTU1NTk1MjM2NH0.Z1qyITp7M_VFxJJpIFGr_vpsAvx3TSgqVvwv6I1t7Y4';
        it('should return all document that user has access to', done => {
            chai.request(app)
                .get('/api/documents')
                .set('x-auth-token', newToken)
                .end(function(error, response) {
                    response.should.have.status(200);
                    done();
                });
        });
    });

    describe('/GET document', () => {
        const newToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2JlNjNlYTNkMWM0M2E3Y2FjY2E3MjYiLCJyb2xlIjoiZ3Vlc3QiLCJpYXQiOjE1NTU5ODEzMDR9.cCTWHgFzH3xWqa-im-lDXtDDRLwEuRHBTvxOUwKVucQ';
        it('should return all document that user has access to', done => {
            chai.request(app)
                .get('/api/documents')
                .set('x-auth-token', newToken)
                .end(function(error, response) {
                    response.should.have.status(200);
                    done();
                });
        });
    });

    describe('PUT document/:id', () => {
        it('should update the document with the given id', done => {
            let document = new Document({
                owner: 'cbdd4071713268b247e0d06',
                title: 'my title',
                docType: 'friction',
                content: 'my content',
                access: 'public'
            });
            document.save(function(error, doc) {
                chai.request(app)
                    .put('/api/documents/' + doc.id)
                    .set('x-auth-token', token)
                    .send({
                        title: 'new title',
                        content: 'new content'
                    })
                    .end(function(error, response) {
                        response.should.have.status(200);
                        response.body.content.should.equal('new content');
                        done();
                    });
            });
        });
    });

    describe('GET document/:id', () => {
        it('should update the document with the given id', done => {
            let document = new Document({
                owner: 'cbdd4071713268b247e0d06',
                title: 'my title',
                docType: 'friction',
                content: 'my content',
                access: 'private'
            });
            document.save(function(error, doc) {
                chai.request(app)
                    .get('/api/documents/' + doc._id)
                    .set('x-auth-token', token)
                    .end(function(error, response) {
                        response.should.have.status(200);
                        response.body.docType.should.equal('friction');
                        response.body.access.should.equal('private');
                        done();
                    });
            });
        });
    });

    describe('GET document/search', () => {
        it('should update the document with the given id', done => {
            let document = new Document({
                owner: 'cbdd4071713268b247e0d06',
                title: 'test',
                docType: 'friction',
                content: 'my content',
                access: 'private'
            });
            document.save(function() {
                chai.request(app)
                    .get('/api/documents/search?key=test')
                    .set('x-auth-token', token)
                    .end(function(error, response) {
                        response.should.have.status(200);
                        done();
                    });
            });
        });
    });

    describe('GET document/private', () => {
        it('should update the document with the given id', done => {
            chai.request(app)
                .get('/api/documents/private')
                .set('x-auth-token', token)
                .end(function(error, response) {
                    response.should.have.status(200);
                    done();
                });
        });
    });

    describe('DELETE document/:id', () => {
        it('should delete document with the given id', done => {
            let document = new Document({
                owner: 'cbdd4071713268b247e0d06',
                title: 'my title',
                docType: 'friction',
                content: 'my content',
                access: 'private'
            });
            document.save(function(error, doc) {
                chai.request(app)
                    .delete('/api/documents/' + doc._id)
                    .set('x-auth-token', token)
                    .end(function(error, response) {
                        response.should.have.status(200);
                        done();
                    });
            });
        });
    });
});
