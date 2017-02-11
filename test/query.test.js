import { expect } from 'chai';
import { describe, it } from 'mocha';

import Query, * as query from '../lib/query';

describe('Query', function () {
  it('should set a single clause as the entire query', function () {
    const body = new Query()
    .query(query.exists('foo'))
    .get();
    expect(body).to.be.an('object').with.all.keys('exists');
  });

  it('should add a second');
});
