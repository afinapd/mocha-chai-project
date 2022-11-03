const chai = require('chai');
const assert = require('chai').assert;
const chaiHttp = require('chai-http');
require('dotenv').config()
chai.use(chaiHttp)

// documents
// https://www.chaijs.com/api/assert/

const api = chai.request(process.env.BASE_URL_REGRES);
const loginData = require('../../testdata/reqres/register-login.json');
const loginFailedData = require('../../testdata/reqres/register-login-failed.json');

describe('Login', function () {
    it('Login - successful', function (done) {
        api.post('/api/login')
        .set({'Accept':'application/json', 'Content-Type':'application/json'})
        .send(loginData)
            .end(function (error, response) {
                assert.equal(response.status, 200);
                assert.typeOf(response.body.token, 'string');
                done();
            })
    })

    it('Login - unsuccessful', function (done) {
        api.post('/api/login')
        .set({'Accept':'application/json', 'Content-Type':'application/json'})
        .send(loginFailedData)
            .end(function (error, response) {
                assert.equal(response.status, 400);
                assert.equal(response.body.error, 'Missing password');
                done();
            })
    })
})