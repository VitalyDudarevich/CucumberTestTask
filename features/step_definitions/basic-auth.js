const { expect } = require('chai');
const { Given, When, Then } = require('cucumber');
const request = require ('request');
let statusCode;
let varuserInDB;
let varpasswordInDB;

Given(/^(.*) is registered wiht the (.*)$/, function (userInDB, passwordInDB){
    varuserInDB = userInDB;
    varpasswordInDB = passwordInDB;
});

When (/^Log in with (.*), (.*) credentials$/, function (user1, password){
    return new Promise(function(resolve, reject) {
        request.get({url: `http://${user1}:${password}@www.httpbin.org/basic-auth/${varuserInDB}/${varpasswordInDB}`},
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
    expect (statusCode).to.equal((varCode));
});
