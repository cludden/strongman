import { expect } from 'chai';
import { describe, it } from 'mocha';

import { matchAll } from '../lib';

describe('matchAll', function () {
  it('handles generic', function () {
    const query = matchAll().get();
    expect(query).to.deep.equal({
      match_all: {},
    });
  });

  it('handles boost', function () {
    const query = matchAll(1.2).get();
    expect(query).to.deep.equal({
      match_all: { boost: 1.2 },
    });
  });
});
