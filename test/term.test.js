import { expect } from 'chai';
import { describe, it } from 'mocha';

import { term } from '../lib';

describe('term', function () {
  it('handles generic', function () {
    const query = term('published', true).get();
    expect(query).to.deep.equal({
      term: {
        published: true,
      },
    });
  });

  it('handles options', function () {
    const query = term('published', true, { boost: 2.0 }).get();
    expect(query).to.deep.equal({
      term: {
        published: {
          value: true,
          boost: 2.0,
        },
      },
    });
  });
});
