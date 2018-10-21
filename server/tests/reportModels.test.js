import { expect } from 'chai';
import db from '../models';


const report = {
  title: 'The title of an article report',
  body: 'This body of an article report',
};


describe('Report model validation', () => {
  it('should not create a report', () => {
    db.Report.create(report)
      .catch((error) => {
        expect(error.message).to.equal('null value in column "userId" violates not-null constraint');
      });
  });

  it('should not update a report', () => {
    db.Report.update({ report }, { where: { id: 100 } })
      .catch((error) => {
        expect(error.message).to.equal('string violation: report cannot be an array or an object');
      });
  });

  it('should not get report', () => {
    db.Report.findOne({ where: { id: 100 } })
      .catch((error) => {
        expect(error.message).to.equal('null value in column "userId" violates not-null constraint');
      });
  });

  it('should not get report', () => {
    db.Report.findAll()
      .catch((error) => {
        expect(error.message).to.equal('null value in column "userId" violates not-null constraint');
      });
  });
});
