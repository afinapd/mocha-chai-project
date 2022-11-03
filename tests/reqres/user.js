const chai = require('chai');
const assert = require('chai').assert;
const chaiHttp = require('chai-http');
require('dotenv').config()
chai.use(chaiHttp)

// documents
// https://www.chaijs.com/api/assert/

const api = chai.request(process.env.BASE_URL_REGRES);

describe('User', function () {
    it('List users', function (done) {
        api.get('/api/users?page=2')
        .set({'Accept':'application/json', 'Content-Type':'application/json'})
            .end(function (error, response) {
                assert.equal(response.status, 200);
                assert.typeOf(response.body.page, 'number');
                assert.typeOf(response.body.per_page, 'number');
                assert.typeOf(response.body.total, 'number');
                assert.typeOf(response.body.total_pages, 'number');
                assert.typeOf(response.body.data, 'array');
                assert.typeOf(response.body.data[0].id, 'number');
                assert.typeOf(response.body.data[0].email, 'string');
                assert.typeOf(response.body.data[0].first_name, 'string');
                assert.typeOf(response.body.data[0].last_name, 'string');
                assert.typeOf(response.body.data[0].avatar, 'string');
                done();
            })
    })

    it('Single user', function (done) {
        api.get('/api/users/2')
        .set({'Accept':'application/json', 'Content-Type':'application/json'})
            .end(function (error, response) {
                assert.equal(response.status, 200);
                assert.typeOf(response.body.data.id, 'number');
                assert.typeOf(response.body.data.email, 'string');
                assert.typeOf(response.body.data.first_name, 'string');
                assert.typeOf(response.body.data.last_name, 'string');
                assert.typeOf(response.body.data.avatar, 'string');
                assert.typeOf(response.body.support.url, 'string');
                assert.typeOf(response.body.support.text, 'string');
                done();
            })
    })

    it('Single user not found', function (done) {
        api.get('/api/users/23')
        .set({'Accept':'application/json', 'Content-Type':'application/json'})
            .end(function (error, response) {
                assert.equal(response.status, 404);
                assert.isEmpty({});
                done();
            })
    })
})