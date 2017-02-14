import { expect } from 'chai';
import { describe, it } from 'mocha';

import { match } from '../lib';

describe('match', function () {
  it('handles generic', function () {
    const query = match('message', 'this is a test').get();
    expect(query).to.deep.equal({
      match: {
        message: 'this is a test',
      },
    });
  });

  it('handles operator', function () {
    const query = match('message', 'this is a test', {
      operator: 'and',
    }).get();
    expect(query).to.deep.equal({
      match: {
        message: {
          query: 'this is a test',
          operator: 'and',
        },
      },
    });
  });

  it('handles zero_terms_query', function () {
    const query = match('message', 'to be or not to be', {
      operator: 'and',
      zero_terms_query: 'all',
    }).get();
    expect(query).to.deep.equal({
      match: {
        message: {
          query: 'to be or not to be',
          operator: 'and',
          zero_terms_query: 'all',
        },
      },
    });
  });
});
