/*
 * bella
 * https://github.com/chrisenytc/bella
 *
 * Copyright (c) 2014 Christopher EnyTC
 * Licensed under the MIT license.
 */

'use strict';

var supertest = require('supertest');
var app = require('../example/app.js');
var request = supertest(app);
var chai = require('chai');
chai.expect();
chai.should();

describe('bella module', function () {
  //Describe #init
  describe('#init()', function () {
    it('should respond with Content-Type json and status code 200', function (done) {
      request
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          hello: 'hello world'
        }, done);
    });
  });
  //Describe #create
  describe('#create()', function () {
    it('should create a new user and responde with status code 200', function (done) {
      request
        .post('/create')
        .send({ip: '127.0.0.1', domain: 'example.com'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          msg: 'Auth Key Created: d948a41098fc2aa79c24864d8978c4360cbef88837c4117957173626f3f50557520bcb6dfcdac6717692b2ad2545bcbaae6b3b927575a1cc5b667b23b3641d6c'
        }, done);
    });
  });
  //Describe #authenticate
  describe('#authenticate()', function () {
    //With basic auth

    //Bad Authentication
    it('should respond with status code 401 and authentication error', function (done) {
      request
        .get('/users?username=notlogged&password=test')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401, {
          error: 'Bad Authentication. You do not have permission to access the API.'
        }, done);
    });

    it('should respond with status code 200 and authentication success', function (done) {
      request
        .get('/users?username=bella&password=test')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          token: 'Access Token: undefined'
        }, done);
    });

    it('should respond with status code 200 and authentication success', function (done) {
      request
        .get('/users?username=chris&password=123')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          token: 'Access Token: undefined'
        }, done);
    });

    //Bad Authentication
    it('should respond with status code 401 and authentication error', function (done) {
      request
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401, {
          error: 'Bad Authentication. You do not have permission to access the API.'
        }, done);
    });

    it('should respond with status code 200 and authentication success', function (done) {
      request
        .get('/users?access_token=d948a41098fc2aa79c24864d8978c4360cbef88837c4117957173626f3f50557520bcb6dfcdac6717692b2ad2545bcbaae6b3b927575a1cc5b667b23b3641d6c')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          token: 'Access Token: d948a41098fc2aa79c24864d8978c4360cbef88837c4117957173626f3f50557520bcb6dfcdac6717692b2ad2545bcbaae6b3b927575a1cc5b667b23b3641d6c'
        }, done);
    });
  });
  //Describe #remove
  describe('#remove()', function () {
    it('should remove a selected user and responde with status code 200', function (done) {
      request
        .del('/remove')
        .send({
          access_token: 'd948a41098fc2aa79c24864d8978c4360cbef88837c4117957173626f3f50557520bcb6dfcdac6717692b2ad2545bcbaae6b3b927575a1cc5b667b23b3641d6c'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          msg: 'Auth Key Deleted: d948a41098fc2aa79c24864d8978c4360cbef88837c4117957173626f3f50557520bcb6dfcdac6717692b2ad2545bcbaae6b3b927575a1cc5b667b23b3641d6c'
        }, done);
    });
  });
});
