import { expect } from 'chai';
import { describe, it } from 'mocha';

import { terms } from '../lib';

describe('term', function () {
  it('handles generic', function () {
    const query = terms('colors', ['blue', 'green']).get();
    expect(query).to.deep.equal({
      terms: {
        colors: ['blue', 'green'],
      },
    });
  });

  it('handles options', function () {
    const query = terms('colors', {
      index: 'colors',
      type: 'color',
      id: 1,
      path: 'complimentary',
    }).get();
    expect(query).to.deep.equal({
      terms: {
        colors: {
          index: 'colors',
          type: 'color',
          id: 1,
          path: 'complimentary',
        },
      },
    });
  });
});
