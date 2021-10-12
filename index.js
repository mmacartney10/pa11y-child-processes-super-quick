const { writeFile } = require('fs');
const { spawn } = require("child_process");
const path = require('path');
const pa11yPath = path.join(__dirname, 'pa11y.js');
const urls = require('./data/input.json');

function logRed(str) {
    console.log('\x1b[31m', str);
}

function logGreen(str) {
    console.log('\x1b[32m', str);
}

function logYellow(str) {
    console.log('\x1b[33m', str);
}

function sortDateByIssue(data) {

    const sortedIssues = {};

    Object.keys(data).forEach(url => {

        const issues = data[url];

        issues.forEach(issue => {

            const message = issue.message;

            if (sortedIssues[message] === undefined) {
                sortedIssues[message] = [url];
            } else {
                sortedIssues[message].push(url);
            }
        });
    });

    return sortedIssues;
}

function runChildProcesses(dirsToVisit, maxAtOnce) {
    let numberOfProcessesRunning = 0;
    let index = 0;
    let data = {};

    function callback() {

        while (numberOfProcessesRunning < maxAtOnce && index < dirsToVisit.length) {

            ++numberOfProcessesRunning;

            const url = dirsToVisit[index++];

            const cmd = `cross-env URL=${url} node pa11y.js`

            const child = spawn(cmd, [], { shell: true });

            logYellow(`Open: ${index} - ${url}`);

            child.stdout.on('data', (urlData) => {

                try {
                    const dataString = urlData.toString();
                    const dataJson = eval(`(${dataString})`);
                    data[url] = dataJson.issues.map(x => ({
                        code: x.code,
                        message: x.message
                    }));
                } catch (e) {
                    data[url] = [];
                }

            });

            child.on('close', function(code) {
                logGreen(`Close: ${url}`);
                --numberOfProcessesRunning;
                callback();
            }).on('error', error => {
                logRed(`Error: ${error}`);
                --numberOfProcessesRunning;
                callback();
            });
        }
        if (numberOfProcessesRunning === 0) {

            const sortedIssues = sortDateByIssue(data);

            writeFile('./data/output.json', JSON.stringify(sortedIssues), 'utf8', () => {
                console.log('Written to ./data/output.json');
            });

            console.timeEnd('timer');
        }
    }
    callback();
}

console.time('timer');
runChildProcesses(urls, 32);