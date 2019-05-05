const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');

const app = express();
app.set('views', path.join(__dirname, 'views'));

// Set view Engine:: @TODO: Static page, HTML?
app.set('view engine', 'pug');

// Add middlewares
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter); // router

// Handling errors
app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error =
        req.app.get('env') === 'development' ? err : {};

    // Render error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;