/*
 * bella
 * https://github.com/chrisenytc/bella
 *
 * Copyright (c) 2013 Christopher EnyTC
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
        .send({
          terminal: true
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          msg: 'Auth Key Created: c9b5baec6a091136ff6450ef43303bb8b1ab0970615134765f2c537ba00d808c8a8deb9564e756bd6f692cc429647afff4b289a47ec9562574473c5d7aef8b6f'
        }, done);
    });
  });
  //Describe #authenticate
  describe('#authenticate()', function () {
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
        .get('/users?access_token=c9b5baec6a091136ff6450ef43303bb8b1ab0970615134765f2c537ba00d808c8a8deb9564e756bd6f692cc429647afff4b289a47ec9562574473c5d7aef8b6f')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          token: 'Access Token: c9b5baec6a091136ff6450ef43303bb8b1ab0970615134765f2c537ba00d808c8a8deb9564e756bd6f692cc429647afff4b289a47ec9562574473c5d7aef8b6f'
        }, done);
    });
  });
  //Describe #remove
  describe('#remove()', function () {
    it('should remove a selected user and responde with status code 200', function (done) {
      request
        .del('/remove')
        .send({
          access_token: 'c9b5baec6a091136ff6450ef43303bb8b1ab0970615134765f2c537ba00d808c8a8deb9564e756bd6f692cc429647afff4b289a47ec9562574473c5d7aef8b6f'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          msg: 'Auth Key Deleted: c9b5baec6a091136ff6450ef43303bb8b1ab0970615134765f2c537ba00d808c8a8deb9564e756bd6f692cc429647afff4b289a47ec9562574473c5d7aef8b6f'
        }, done);
    });
  });
});
