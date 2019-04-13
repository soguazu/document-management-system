import 'dotenv/config';

// import 'babel-polyfill';

import express from 'express';
import mongoose from 'mongoose';

import config from './config';
import authRouter from './app/routes/auth';

const app = express();
app.use(express.json());
mongoose
    .connect(config.db, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('Database connected successfully'))
    .catch(error => console.log(error.message));

app.use('/api/auth', authRouter);

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
