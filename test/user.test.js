import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../index';

chai.config.includeStack = true;

describe.only('## User APIs', () => {
  describe('# POST /api/topActiveUsers', () => {
    it('should get topActiveUsers', (done) => {
      request(app)
        .get('/api/topActiveUsers')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.lengthOf(3);
          done();
        });
    });
  });

  describe('# POST /api/users', () => {
    it('should get user resources', (done) => {
      request(app)
        .get('/api/users?id=5c160d6336fe3e377b1d865e')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('createdAt');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('companies');
          expect(res.body).to.have.property('createdListings');
          expect(res.body).to.have.property('applications').to.have.lengthOf(1);
          done();
        });
    });
  });
});
