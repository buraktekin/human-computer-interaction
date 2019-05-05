#!/usr/bin/env node

var app = require('../../app');

app.listen(8000, () => {
    console.log('Listening on port 8000');
});