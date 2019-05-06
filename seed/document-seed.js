/* eslint-disable no-undef */
// import mongoose from 'mongoose';

// import { Document } from '../app/models/document';

// import config from './config';

let mongoose = require('mongoose');

let { Document } = require('../app/models/document');

mongoose
    .connect(
        'mongodb+srv://grey123:grey123@dmscluster-evk9t.mongodb.net/dms?retryWrites=true',
        {
            useNewUrlParser: true,
            useCreateIndex: true
        }
    )
    .then(() => console.log('Database connected successfully'));

let documents = [
    new Document({
        owner: '5cd0328ac05d6597c482e2ab',
        title: 'Advance Javascript',
        docType: 'Programming',
        content: 'testing',
        access: 'private',
        createdAt: Date.now(),
        modifiedAt: Date.now()
    }),
    new Document({
        owner: '5cd0328ac05d6597c482e2ab',
        title: 'Advance Javascript Concept',
        docType: 'Programming',
        content: 'testing',
        access: 'public',
        createdAt: Date.now(),
        modifiedAt: Date.now()
    }),
    new Document({
        owner: '5cd0328ac05d6597c482e2a9',
        title: 'Reactive programming',
        docType: 'Programming',
        content: 'testing',
        access: 'public',
        createdAt: Date.now(),
        modifiedAt: Date.now()
    }),
    new Document({
        owner: '5cd0328ac05d6597c482e2a9',
        title: 'OOP with C++',
        docType: 'Programming',
        content: 'testing',
        access: 'private',
        createdAt: Date.now(),
        modifiedAt: Date.now()
    }),
    new Document({
        owner: '5cd0328ac05d6597c482e2ab',
        title: 'Design Patterns with Javascript',
        docType: 'Programming',
        content: 'testing',
        access: 'private',
        createdAt: Date.now(),
        modifiedAt: Date.now()
    })
];

let done = 0;
for (let i = 0; i < documents.length; i++) {
    documents[i].save(function() {
        done++;
        if (done === documents.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
