const { expect } = require('chai');
const { When, Then } = require('cucumber');
const request = require('request');
const config = require ('../../configs/config.json');
let baseURL = config.urls.testUrl;
let parsedHeaders;


When (/^I send additional headers (.*) to target site$/, function(header){
    return new Promise(function(resolve, reject) {
        request({url: baseURL+'/get', headers: JSON.parse(header)}, function(err, resp, body) {
            if (err) {
                reject(err);
            }
            parsedHeaders = JSON.parse(body).headers;
            resolve(JSON.parse(body));
        })
    });
});

Then (/^I check if headers (.*) is in response body$/, function(header){
    let headersHardCoded = { Connection: 'close', Host: 'www.httpbin.org'};
    expect(parsedHeaders).to.deep.equal( Object.assign(headersHardCoded, JSON.parse(header)));
});
