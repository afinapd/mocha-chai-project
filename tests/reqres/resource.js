const chai = require('chai');
const assert = require('chai').assert;
const chaiHttp = require('chai-http');
require('dotenv').config()
chai.use(chaiHttp)

// documents
// https://www.chaijs.com/api/assert/

const api = chai.request(process.env.BASE_URL_REGRES);

describe('Resource', function () {
    it('List <resource>', function (done) {
        api.get('/api/unknown')
        .set({'Accept':'application/json', 'Content-Type':'application/json'})
            .end(function (error, response) {
                assert.equal(response.status, 200);
                assert.typeOf(response.body.page, 'number');
                assert.typeOf(response.body.per_page, 'number');
                assert.typeOf(response.body.total, 'number');
                assert.typeOf(response.body.total_pages, 'number');
                assert.typeOf(response.body.data, 'array');
                assert.typeOf(response.body.data[0].id, 'number');
                assert.typeOf(response.body.data[0].name, 'string');
                assert.typeOf(response.body.data[0].year, 'number');
                assert.typeOf(response.body.data[0].color, 'string');
                assert.typeOf(response.body.data[0].pantone_value, 'string');
                done();
            })
    })

    it('Single <resource>', function (done) {
        api.get('/api/unknown/2')
        .set({'Accept':'application/json', 'Content-Type':'application/json'})
            .end(function (error, response) {
                assert.equal(response.status, 200);
                assert.typeOf(response.body.data.id, 'number');
                assert.typeOf(response.body.data.name, 'string');
                assert.typeOf(response.body.data.year, 'number');
                assert.typeOf(response.body.data.color, 'string');
                assert.typeOf(response.body.data.pantone_value, 'string');
                assert.typeOf(response.body.support.url, 'string');
                assert.typeOf(response.body.support.text, 'string');
                done();
            })
    })

    it('Single <resource> not found', function (done) {
        api.get('/api/unknown/23')
        .set({'Accept':'application/json', 'Content-Type':'application/json'})
            .end(function (error, response) {
                assert.equal(response.status, 404);
                assert.isEmpty({});
                done();
            })
    })
})