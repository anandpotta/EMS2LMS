import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import mongoose from "mongoose";
import initPassport from "./config/passport";
import config from './config';
import path from "path";
import favicon from 'serve-favicon';
import 'babel-polyfill';


mongoose.Promise = global.Promise;
mongoose.connect(config.db.uri, config.db.options, function (error) {
    // Check error in initial connection. There is no 2nd param to the callback.
    if (error) console.error('ERROR:', error);
    console.log('Connect to database:', config.db.uri);
});


const app = express();
initPassport(app);
app.use(express.static('static'));
app.use(bodyParser.json());
app.use(favicon(path.join('static', 'images', 'favicon.ico')));

// Enbale error handling
const error = require('./middleware/error');
app.use(error.clientErrorHandler);
app.use(error.logErrors);

// enable server cors mode
const cors = require('./middleware/cors');
app.use(cors);

// pass the authorization checker middleware
const authCheckMiddleware = require('./middleware/auth-check');
app.use('/api', authCheckMiddleware);


if (process.env.NODE_ENV === 'development') {
    //use logger
    const morgan = require("morgan");
    app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') {
    app.use(compression());
}

const auth = require('./routes/auth');
import user from './routes/user';
import department from './routes/department';
import employee from './routes/employee';

app.use('/auth', auth);
app.use('/api/user', user);
app.use('/api/department', department);
app.use('/api/employee', employee);
app.get('*', (req, res) => {
    console.log('route to no where');
    res.sendFile(path.resolve('static/index.html'));
});

const port = process.env.PORT || config.server.port;
app.listen(port, () => {
    console.log('Express server listening on %d, in %s mode', port, app.get('env'));
});
