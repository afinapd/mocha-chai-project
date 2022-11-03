const chai = require('chai');
const assert = require('chai').assert;
const chaiHttp = require('chai-http');
require('dotenv').config()
chai.use(chaiHttp)

// documents
// https://www.chaijs.com/api/assert/

const api = chai.request(process.env.BASE_URL_REGRES);

describe('Delayed Response', function () {
    it('Delayed Response', function (done) {
        this.timeout(5000);
        api.get('/api/users?delay=3')
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
})