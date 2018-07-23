const { expect } = require('chai');
const { When, Then } = require('cucumber');
const request = require('request');
const config = require ('../../configs/config.json');
let baseURL = config.urls.testUrl;
let counting;
let statusCode;

When(/^Send the number: (\d+) of streams$/, function(number) {
    return new Promise(function(resolve, reject) {
        request.get({url: baseURL+`/stream/${number}`}, function(err, resp, body) {
            statusCode = resp.statusCode;
            counting =((body).match((/url/g) || []).length);
            if (err) {
                reject(err);
            }
            resolve(body);
        })
    });
});

Then(/^The (.*) of streams is the numbers of rows in the response$/, function(number) {
 expect(counting).to.equal(parseInt(number));
 expect(statusCode).to.equal(200);

});
