/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import fs from 'fs';
import http from 'http';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import errorhandler from 'errorhandler';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import indexRouter from './routes/index';
import facebookStrategy from './config/facebookStrategy';
import googleStrategy from './config/googleStrategy';

const swaggerDocument = YAML.load(`${process.cwd()}/swagger.yaml`);

const isProduction = process.env.NODE_ENV === 'production';

// Create global app object
const app = express();

app.use(cors());

// Normal express config defaults
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.resolve('./public')));

passport.use(facebookStrategy);
passport.use(googleStrategy);

// Initialize Passport
app.use(passport.initialize());

if (!isProduction) {
  app.use(errorhandler());
}

// Swagger documentation routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* Index router */
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// / error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use((err, req, res, next) => {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});

export default app;
