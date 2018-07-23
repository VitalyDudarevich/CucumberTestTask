const { expect } = require('chai');
const { When, Then } = require('cucumber');
const request = require('request');
const config = require ('../../configs/config.json');
let baseURL = config.urls.testUrl;
let parsedBody;
let parsedArg;
let parameter;
let parameterValue;
let expectedBody;

When (/^send additional parameter: (.*) and parameter value: (.*) and body: (.*) informatoin$/, function (param, paramValue, newBody){
    parameter = param;
    parameterValue = paramValue;
    expectedBody = newBody;
    return new Promise(function(resolve, reject) {
        request.post({
                url: baseURL+`/post?${param}=${paramValue}`,
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

Then(/^Correct data is returned in the response$/, function(){
    expect(parsedBody).to.equal(expectedBody);
    expect(parsedArg).to.deep.equal(JSON.parse(`{"${parameter}": "${parameterValue}"}`));
    expect(Object.assign(parsedBody, parsedArg)).to.deep.equal(Object.assign(expectedBody, JSON.parse(`{"${parameter}": "${parameterValue}"}`)));
});