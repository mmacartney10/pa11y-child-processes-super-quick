
const pa11y = require('pa11y');

const url = process.env.URL;
const options = {
    includeWarnings: true,
    ignore: [
        'WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs',
        'WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.BgImage',
        'WCAG2AA.Principle1.Guideline1_4.1_4_10.C32,C31,C33,C38,SCR34,G206',
        'WCAG2AA.Principle1.Guideline1_4.1_4_3_F24.F24.FGColour'
    ],
    hideElements: '[data-tab-content="book-tickets-old"]'
}

pa11y(url, options).then((results) => {
    console.log(results);
});
