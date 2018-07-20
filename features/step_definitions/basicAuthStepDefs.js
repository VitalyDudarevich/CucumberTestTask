const { expect } = require('chai');
const { Given, When, Then } = require('cucumber');
const request = require('request');
let statusCode;
let expectedUser;
let expectedPassword;

Given(/^(.*) is registered with the (.*)$/, function(userInDB, passwordInDB){
    expectedUser = userInDB;
    expectedPassword = passwordInDB;
});

When (/^Log in with (.*), (.*) credentials$/, function(user1, password){
    return new Promise(function(resolve, reject) {
        request.get({url: `http://${user1}:${password}@www.httpbin.org/basic-auth/${expectedUser}/${expectedPassword}`},
            function(err, resp, body) {
                if (err) {
                    reject(err);
                } else {
                    statusCode = resp.statusCode;
                    resolve(resp.statusCode);
                }
            }
        );
    });
});

Then (/^Status code (\d+) is returned$/, function(varCode){
    expect(statusCode).to.equal(varCode);
});
