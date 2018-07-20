const { expect } = require('chai');
const { Given, When, Then } = require('cucumber');
const request = require ('request');
let parsedBody;
let parsedArg;

When (/^send additional (.*) and (.*) and (.*) informatoin$/, function (param, paramValue, newBody){
    return new Promise(function(resolve, reject) {
        request.post({
                url: `http://www.httpbin.org/post?${param}=${paramValue}`,
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({newBody})},
            function(err, resp, body) {
                parsedBody = JSON.parse(body).json.newBody.trim();
                parsedArg =JSON.parse(body).args;
                if (err) {
                    reject(err);
                }
                resolve(body);
            }
        );
    });
});

Then(/^Correct (.*) and (.*) and (.*) is in responce$/, function (newBody, param, paramValue){
    expect (parsedBody).to.equal(newBody);
    expect (parsedArg).to.deep.equal(JSON.parse(`{"${param}": "${paramValue}"}`));
    expect (Object.assign(parsedBody, parsedArg)).to.deep.equal(Object.assign(newBody, JSON.parse(`{"${param}": "${paramValue}"}`)));
});