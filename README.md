# pa11y-child-processes-super-quick

- Run `npm install`
- Add the list of urls you want to test to `data/input.json`
- Run `npm start`
- The output should be in the `data/output.json` file.

# The output file will be an structured as follows:

```
{
    "Here is an issue": [
        "url that breaks this issue"
    ],
    "Duplicate id attribute value \"google\" found on the web page.": [
        "https://www.google.com",
        "https://www.example.com"
    ]
}
```