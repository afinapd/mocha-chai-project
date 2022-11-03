const chai = require('chai');
const assert = require('chai').assert;
const chaiHttp = require('chai-http');
require('dotenv').config()
chai.use(chaiHttp)

// documents
// https://www.chaijs.com/api/assert/

const api = chai.request(process.env.BASE_URL_GOREST);

describe('gorest', function () {
    it('List users', function (done) {
        api.get('/public/v2/users')
        .set({'Accept':'application/json', 'Content-Type':'application/json'})
            .end(function (error, response) {
                assert.equal(response.status, 200);
                assert.typeOf(response.body[0].id, 'number');
                assert.typeOf(response.body[0].name, 'string');
                assert.typeOf(response.body[0].email, 'string');
                assert.typeOf(response.body[0].gender, 'string');
                assert.typeOf(response.body[0].status, 'string');
                done();
            })
    })

    it('Create User', function (done) {
        api.post('/public/v2/users')
        .set({'Accept':'application/json', 'Content-Type':'application/json', 'Authorization':'Bearer a1eda2d136cecef824545a66d7e4daec61575358b36efbe20fe751d94d0f1420'})
        .send({"name":"Afina Putri", "gender":"female", "email":"afinapd02@test.com", "status":"active"})
            .end(function (error, response) {
                assert.equal(response.status, 201);
                global.user_id = response.body.id
                assert.typeOf(response.body.id, 'number');
                assert.typeOf(response.body.name, 'string');
                assert.typeOf(response.body.email, 'string');
                assert.typeOf(response.body.gender, 'string');
                assert.typeOf(response.body.status, 'string');
                done();
            })
    })

    it('Update user', function (done) {
        api.patch('/public/v2/users/' + global.user_id)
        .set({'Accept':'application/json', 'Content-Type':'application/json', 'Authorization':'Bearer a1eda2d136cecef824545a66d7e4daec61575358b36efbe20fe751d94d0f1420'})
        .send({"name":"Afina Update", "email":"afina.update@test.com", "status":"active"})
            .end(function (error, response) {
                assert.equal(response.status, 200);
                assert.typeOf(response.body.id, 'number');
                assert.typeOf(response.body.name, 'string');
                assert.typeOf(response.body.email, 'string');
                assert.typeOf(response.body.gender, 'string');
                assert.typeOf(response.body.status, 'string');
                assert.equal(response.body.name, 'Afina Update');
                assert.equal(response.body.email, 'afina.update@test.com');
                assert.equal(response.body.status, 'active');
                done();
            })
    })

    it('Delete user', function (done) {
        api.delete('/public/v2/users/' + global.user_id)
        .set({'Accept':'application/json', 'Content-Type':'application/json', 'Authorization':'Bearer a1eda2d136cecef824545a66d7e4daec61575358b36efbe20fe751d94d0f1420'})
            .end(function (error, response) {
                assert.equal(response.status, 204);
                done();
            })
    })
})