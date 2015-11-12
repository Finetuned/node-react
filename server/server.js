'use strict';
require('babel-core/register');
const express = require('express');
const bodyParser = require('body-parser');
const processor = require('./react-processor');
const config = require('./config/config');

function getRequestParams(request) {
    return function (prop) {
        return request[prop];
    };
}

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/', (req, res) => {
    const getProperty = getRequestParams(req.body);

    if (getProperty('cmp')) {
        processor.run(getProperty, response => {
            res.send(response);
        });
    }
});

function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}

app.use(logErrors);

const server = app.listen(config.port, config.host, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
