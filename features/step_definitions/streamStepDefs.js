const { expect } = require('chai');
const { When, Then } = require('cucumber');
const request = require('request');
let counting;
let statusCode;

When(/^Send the number: (\d+) of streams$/, function(number) {
    return new Promise(function(resolve, reject) {
        request.get({url: `http://www.httpbin.org/stream/${number}`}, function(err, resp, body) {
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
