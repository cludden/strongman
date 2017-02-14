import R from 'ramda';

import Query from './core/query';

export default function range(options) {
  return new Range(options);
}

export const props = ['boost', 'gt', 'gte', 'lt', 'lte'];

export class Range extends Query {
  constructor(options = {}) {
    super();
    this.q = {
      range: {},
    };
    props.forEach((prop) => {
      if (options[prop] && typeof options[prop] === 'number') {
        this.q.range[prop] = options[prop];
      }
    });
  }

  boost(val) {
    return setNumericProperty.call(this, 'boost', val);
  }

  gt(val) {
    return setNumericProperty.call(this, 'gt', val);
  }

  gte(val) {
    return setNumericProperty.call(this, 'gte', val);
  }

  lt(val) {
    return setNumericProperty.call(this, 'lt', val);
  }

  lte(val) {
    return setNumericProperty.call(this, 'lte', val);
  }
}

function setNumericProperty(prop, val) {
  if (!R.is(Number, val)) {
    throw new Error('range.gt accepts a number');
  }
  this.q = R.assocPath(['range', prop], val, this.q);
  return this;
}
