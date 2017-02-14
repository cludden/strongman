# strongman
a node module for composing [elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html) queries, inspired by [bodybuilder.js](https://github.com/danpaz/bodybuilder)

*note: this is still a work in progress and is not suitable for use in production*

## Installing
```shell
$ npm install --save strongman
```

## Getting Started
```javascript
import { expect } from 'chai'
import { bool, term, exists } from 'strongman'

const query = bool().filter(
  term('published', true),
  bool().should(
    term('whitelist', 'foo'),
    bool().must(
      exists('blacklist')
    ).mustNot(
      term('blacklist', 'foo')
    )
  ).minimumShouldMatch(1)
)

expect(query.get()).to.deep.equal({
  bool: {
    filter: [{
      term: {
        published: true
      }
    }, {
      bool: {
        should: [{
          term: {
            whitelist: 'foo'
          }
        }, {
          bool: {
            must: {
              exists: {
                field: 'blacklist'
              }
            },
            must_not: {
              term: {
                blacklist: 'foo'
              }
            }
          }
        }],
        minimum_should_match: 1
      }
    }]
  }
})
```

## Queries
*coming soon**

## Testing
```shell
$ npm test
```

## Contributing
1. [Fork it](https://github.com/cludden/strongman/fork)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## License
Copyright (c) 2017 Chris Ludden.
Licensed under the [MIT license](LICENSE.md).
