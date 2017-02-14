import { expect } from 'chai';
import { describe, it } from 'mocha';

import { bool, exists, term } from '../lib';

describe('Bool', function () {
  it('single must', function () {
    const query = bool().must(exists('foo')).get();
    expect(query).to.deep.equal({
      bool: {
        must: {
          exists: {
            field: 'foo',
          },
        },
      },
    });
  });

  it('multiple must', function () {
    const query = bool().must(exists('foo'), exists('bar')).get();
    expect(query).to.deep.equal({
      bool: {
        must: [{
          exists: {
            field: 'foo',
          },
        }, {
          exists: {
            field: 'bar',
          },
        }],
      },
    });
  });

  it('single should', function () {
    const query = bool().should(exists('foo')).get();
    expect(query).to.deep.equal({
      bool: {
        should: {
          exists: {
            field: 'foo',
          },
        },
      },
    });
  });

  it('multiple should', function () {
    const query = bool().should(exists('foo'), exists('bar')).get();
    expect(query).to.deep.equal({
      bool: {
        should: [{
          exists: {
            field: 'foo',
          },
        }, {
          exists: {
            field: 'bar',
          },
        }],
      },
    });
  });

  it('multiple should with minimumShouldMatch', function () {
    const query = bool().should(exists('foo'), exists('bar'))
    .minimumShouldMatch(1).get();
    expect(query).to.deep.equal({
      bool: {
        should: [{
          exists: {
            field: 'foo',
          },
        }, {
          exists: {
            field: 'bar',
          },
        }],
        minimum_should_match: 1,
      },
    });
  });

  it('single mustNot', function () {
    const query = bool().mustNot(exists('foo')).get();
    expect(query).to.deep.equal({
      bool: {
        must_not: {
          exists: {
            field: 'foo',
          },
        },
      },
    });
  });

  it('multiple mustNot', function () {
    const query = bool().mustNot(exists('foo'), exists('bar')).get();
    expect(query).to.deep.equal({
      bool: {
        must_not: [{
          exists: {
            field: 'foo',
          },
        }, {
          exists: {
            field: 'bar',
          },
        }],
      },
    });
  });

  it('filter', function () {
    const query = bool().filter(term('published', true)).get();
    expect(query).to.deep.equal({
      bool: {
        filter: {
          term: {
            published: true,
          },
        },
      },
    });
  });

  it('multiple filters', function () {
    const query = bool().filter(term('published', true), term('available', true)).get();
    expect(query).to.deep.equal({
      bool: {
        filter: [{
          term: {
            published: true,
          },
        }, {
          term: {
            available: true,
          },
        }],
      },
    });
  });

  it('mix and match', function () {
    const query = bool().must(exists('foo'))
    .mustNot(exists('bar'))
    .should(
      term('foo', 'bar'),
      term('foo', 'blah'),
    )
    .minimumShouldMatch(1)
    .get();
    expect(query).to.deep.equal({
      bool: {
        must: {
          exists: {
            field: 'foo',
          },
        },
        should: [{
          term: {
            foo: 'bar',
          },
        }, {
          term: {
            foo: 'blah',
          },
        }],
        must_not: {
          exists: {
            field: 'bar',
          },
        },
        minimum_should_match: 1,
      },
    });
  });

  it('nested bool', function () {
    const query = bool().filter(
      term('published', true),
      bool().should(
        term('whitelist', 'foo'),
        bool().must(
          exists('blacklist'),
        ).mustNot(
          term('blacklist', 'foo'),
        ),
      ).minimumShouldMatch(1),
    ).get();
    expect(query).to.deep.equal({
      bool: {
        filter: [{
          term: {
            published: true,
          },
        }, {
          bool: {
            should: [{
              term: {
                whitelist: 'foo',
              },
            }, {
              bool: {
                must: {
                  exists: {
                    field: 'blacklist',
                  },
                },
                must_not: {
                  term: {
                    blacklist: 'foo',
                  },
                },
              },
            }],
            minimum_should_match: 1,
          },
        }],
      },
    });
  });
});
