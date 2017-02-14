import { expect } from 'chai';
import { describe, it } from 'mocha';

import { ids } from '../lib';

describe('id', function () {
  it('handles single id', function () {
    const query = ids('abc').get();
    expect(query).to.deep.equal({
      ids: {
        values: ['abc'],
      },
    });
  });

  it('handles multiple ids', function () {
    const query = ids(['abc', 'def']).get();
    expect(query).to.deep.equal({
      ids: {
        values: ['abc', 'def'],
      },
    });
  });

  it('handles type', function () {
    const query = ids('abc', 'item').get();
    expect(query).to.deep.equal({
      ids: {
        values: ['abc'],
        type: 'item',
      },
    });
  });

  it('handles multiple types', function () {
    const query = ids(['abc', 'def'], ['item', 'thing']).get();
    expect(query).to.deep.equal({
      ids: {
        values: ['abc', 'def'],
        type: ['item', 'thing'],
      },
    });
  });

  it('should throw on invalid id', function () {
    expect(ids.bind(null, true)).to.throw(Error);
    expect(ids.bind(null, ['abc', true])).to.throw(Error);
  });

  it('should throw on invalid type', function () {
    expect(ids.bind(null, 'abc', true)).to.throw(Error);
    expect(ids.bind(null, ['abc'], ['thing', true])).to.throw(Error);
  });
});
