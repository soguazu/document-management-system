import { Document } from '../models/document';

const services = {};

services.post = async payload => {
    let document = new Document({
        owner: payload.user._id,
        title: payload.body.title,
        docType: payload.body.docType,
        content: payload.body.content,
        access: payload.body.access
    });

    const savedDocument = await document.save();

    return savedDocument;
};

services.getAllDocsForAdmin = async request => {
    let perPage = Number(request.query.perPage) || 10;
    let page = request.query.page || 1;
    let skip = perPage * page - perPage;

    let documents = await Document.find()
        .limit(perPage)
        .skip(skip)
        .sort('-createdAt');

    return documents;
};

services.getAllDocsForUser = async request => {
    let perPage = Number(request.query.perPage) || 10;
    let page = request.query.page || 1;
    let skip = perPage * page - perPage;
    let documents = await Document.find()
        .or([
            { access: 'public' },
            { owner: request.user._id },
            { access: request.user.role }
        ])
        .limit(perPage)
        .skip(skip)
        .sort('-createdAt');

    return documents;
};

services.getAllDocsForGuest = async request => {
    let perPage = Number(request.query.perPage) || 10;
    let page = request.query.page || 1;
    let skip = perPage * page - perPage;
    let documents = await Document.find()
        .or([
            { access: 'public' },
            { owner: request.user._id },
            { access: request.user.role }
        ])
        .limit(perPage)
        .skip(skip)
        .sort('-createdAt');

    return documents;
};

services.getById = async id => {
    const document = await Document.findById(id);
    return document;
};

services.getPrivate = async request => {
    const document = await Document.find({
        access: 'private',
        owner: request.user._id
    });

    return document;
};

services.update = async (id, payload) => {
    const document = await Document.findOneAndUpdate(
        id,
        {
            title: payload.title,
            content: payload.content
        },
        { new: true }
    );

    return document;
};

services.delete = async id => {
    const document = await Document.findOneAndDelete(id);
    return document;
};

services.search = async (request, query) => {
    let perPage = Number(request.query.perPage) || 10;
    let page = request.query.page || 1;
    let skip = perPage * page - perPage;
    const documents = await Document.find({
        $or: [
            { content: { $regex: new RegExp('.*' + query + '.*', 'gi') } },
            { title: { $regex: new RegExp('.*' + query + '.*', 'gi') } }
        ]
    })
        .limit(perPage)
        .skip(skip)
        .sort('-createdAt');
    return documents;
};

export default services;
