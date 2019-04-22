import 'dotenv/config';

// import 'babel-polyfill';

import express from 'express';
import mongoose from 'mongoose';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import config from './config';
import authRouter from './app/routes/auth';
import logoutRouter from './app/routes/logout';
import userRouter from './app/routes/user';
import roleRouter from './app/routes/role';
import documentRouter from './app/routes/document';

const app = express();

const options = {
    swaggerDefinition: {
        // Like the one described here: https://swagger.io/specification/#infoObject
        info: {
            title: 'API for Document Management System',
            version: '1.0.0',
            description: 'Simple API to manage document system'
        }
    },
    // List of files to be processes. You can also set globs './app/routes/*.js'
    apis: ['./app/routes/*.js']
};

const specs = swaggerJsdoc(options);

app.use(express.json());
mongoose
    .connect(config.db, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('Database connected successfully'));
// .catch(error => console.log(error.message));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/auth', authRouter);
app.use('/api/auth/signout', logoutRouter);
app.use('/api/users', userRouter);
app.use('/api/roles', roleRouter);
app.use('/api/documents', documentRouter);

app.listen(config.httpPort, () => {
    console.log(
        'Server listening on port ' +
            config.httpPort +
            ' and ' +
            config.envName +
            ' environment'
    );
});

export default app;
