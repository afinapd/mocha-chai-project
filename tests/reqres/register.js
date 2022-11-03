const chai = require('chai');
const assert = require('chai').assert;
const chaiHttp = require('chai-http');
require('dotenv').config()
chai.use(chaiHttp)

// documents
// https://www.chaijs.com/api/assert/

const api = chai.request(process.env.BASE_URL_REGRES);
const registerData = require('../../testdata/reqres/register-login.json');
const registerFailedData = require('../../testdata/reqres/register-login-failed.json');

describe('Register', function () {
    it('Register - successful', function (done) {
        api.post('/api/register')
        .set({'Accept':'application/json', 'Content-Type':'application/json'})
        .send(registerData)
            .end(function (error, response) {
                assert.equal(response.status, 200);
                assert.typeOf(response.body.id, 'number');
                assert.typeOf(response.body.token, 'string');
                done();
            })
    })

    it('Register - unsuccessful', function (done) {
        api.post('/api/register')
        .set({'Accept':'application/json', 'Content-Type':'application/json'})
        .send(registerFailedData)
            .end(function (error, response) {
                assert.equal(response.status, 400);
                assert.equal(response.body.error, 'Missing password');
                done();
            })
    })
})