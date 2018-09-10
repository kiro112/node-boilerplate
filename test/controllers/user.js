'use strict';

require('app-module-path/register');

const chai = require('chai');
const request = require('supertest');

const should = chai.should();

const server = require('./../../bin/server');
const app = request.agent(server);


describe('User', () => {
    let userId;
    
    it('should be created successfuly', done => {
        app.post('/user')
            .send({ name: 'Jairo Malanay' })
            .expect(200)
            .end((err, res) => {
                should.not.exist(err);
                res.body.should.have.property('success', true);
                res.body.data.should.have.property('id');

                userId = res.body.data.id;
                done();
            });
    });

    it('should retrieve details', done => {
        app.get(`/user/${userId}`)
            .expect(200)
            .end((err, res) => {
                should.not.exist(err);
                res.body.should.have.property('success', true);
                res.body.data.should.have.property('id', userId);
                
                done();
            });
    });

    it('should retrieve list', done => {
        app.get(`/user`)
            .expect(200)
            .end((err, res) => {
                should.not.exist(err);
                res.body.should.have.property('success', true);
                res.body.data.should.have.property('items');
                res.body.data.items.should.be.an('array');

                done();
            });
    });

    it('should be updated', done => {
        app.put(`/user/${userId}`)
            .send({ name: 'Jai Malanay' })
            .expect(200)
            .end((err, res) => {
                should.not.exist(err);
                res.body.should.have.property('success', true);
                res.body.data.should.have.property('message');
                done();
            });
    });


    it('should be deleted', done => {
        app.del(`/user/${userId}`)
            .expect(200)
            .end((err, res) => {
                should.not.exist(err);
                res.body.should.have.property('success', true);
                res.body.data.should.have.property('message');
                done();
            });
    });

});