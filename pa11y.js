#!/usr/bin/env node
const pa11y = require('pa11y');
const url = process.argv[2];
const options = {}

pa11y(url, options).then((results) => {
    console.log(results);
});
