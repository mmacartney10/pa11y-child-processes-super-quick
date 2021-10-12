
const pa11y = require('pa11y');

const url = process.env.URL;
const options = {}

pa11y(url, options).then((results) => {
    console.log(results);
});
