/*
 * bella
 * https://github.com/chrisenytc/bella
 *
 * Copyright (c) 2014, Christopher EnyTC
 * Licensed under the MIT license.
 */

'use strict';

var supertest = require('supertest');
var app = require('../example/app.js');
var request = supertest(app);
var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('bella module', function() {
    //Describe #init
    describe('#init()', function() {
        it('should respond with Content-Type json and status code 200', function(done) {
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
    describe('#create()', function() {
        it('should create a new user and responde with status code 200', function(done) {
            request
                .post('/create')
                .send({
                    ip: '127.0.0.1',
                    domain: 'localhost'
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, {
                    msg: 'Auth Key Created: null'
                })
                .end(done);
        });
    });
    //Describe #authenticate
    describe('#authenticate()', function() {

        //Bad Authentication
        it('should respond with status code 401 and authentication error', function(done) {
            request
                .get('/users')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401, {
                    metadata: {
                        status: 401,
                        msg: 'Unauthorized'
                    },
                    response: {
                        msg: 'Bad Authentication. You do not have permission to access the API.',
                        error: 'access_token not found'
                    }
                }, done);
        });

        //Bad Authentication
        it('should respond with status code 401 and authentication error with access_token', function(done) {
            request
                .get('/users?access_token=testtoken')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401, {
                    metadata: {
                        status: 401,
                        msg: 'Unauthorized'
                    },
                    response: {
                        msg: 'Bad Authentication. You do not have permission to access the API.',
                        error: 'access_token not found'
                    }
                }, done);
        });

    });
});
