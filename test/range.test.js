import { expect } from 'chai';
import { describe, it } from 'mocha';

import { range } from '../lib';

describe('range', function () {
  it('handles generic', function () {
    const query = range({ gte: 10, lt: 20 }).get();
    expect(query).to.deep.equal({
      range: {
        gte: 10,
        lt: 20,
      },
    });
  });

  it('handles chained methods', function () {
    const query = range().gt(10)
    .lte(20)
    .boost(2.0)
    .get();
    expect(query).to.deep.equal({
      range: {
        gt: 10,
        lte: 20,
        boost: 2.0,
      },
    });
  });
});
