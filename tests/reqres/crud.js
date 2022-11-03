const chai = require('chai');
const assert = require('chai').assert;
const chaiHttp = require('chai-http');
require('dotenv').config()
chai.use(chaiHttp)

// documents
// https://www.chaijs.com/api/assert/

const api = chai.request(process.env.BASE_URL_REGRES);
const createUserData = require('../../testdata/reqres/create-user.json');
const updateUserData = require('../../testdata/reqres/update-user.json');

describe('CRUD', function () {
    it('Create', function (done) {
        api.post('/api/users')
        .set({'Accept':'application/json', 'Content-Type':'application/json'})
        .send(createUserData)
            .end(function (error, response) {
                assert.equal(response.status, 201);
                global.user_id = response.body.id
                assert.typeOf(response.body.name, 'string');
                assert.typeOf(response.body.job, 'string');
                assert.typeOf(response.body.id, 'string');
                assert.typeOf(response.body.createdAt, 'string');
                done();
            })
    })

    it('Update', function (done) {
        api.put('/api/users/' + global.user_id)
        .set({'Accept':'application/json', 'Content-Type':'application/json'})
        .send(updateUserData)
            .end(function (error, response) {
                assert.equal(response.status, 200);
                assert.typeOf(response.body.name, 'string');
                assert.typeOf(response.body.job, 'string');
                assert.typeOf(response.body.updatedAt, 'string');
                done();
            })
    })

    it('Update', function (done) {
        api.patch('/api/users/' + global.user_id)
        .set({'Accept':'application/json', 'Content-Type':'application/json'})
        .send(updateUserData)
            .end(function (error, response) {
                assert.equal(response.status, 200);
                assert.typeOf(response.body.name, 'string');
                assert.typeOf(response.body.job, 'string');
                assert.typeOf(response.body.updatedAt, 'string');
                done();
            })
    })

    it('Delete', function (done) {
        api.delete('/api/users/' + global.user_id)
            .end(function (error, response) {
                assert.equal(response.status, 204);
                done();
            })
    })
})