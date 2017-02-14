import R from 'ramda';

import Query from './query';

const append = value => (leaf) => {
  let val = value;
  if (val instanceof Query) {
    val = val.get();
  }
  if (!leaf) {
    return val;
  }
  if (!Array.isArray(leaf)) {
    return [leaf, val];
  }
  return leaf.concat(val);
};

export class Bool extends Query {
  constructor() {
    super({});
  }

  _appendToPath(prop, clauses) {
    R.forEach((clause) => {
      this.q = R.over(R.lensPath(['bool', prop]), append(clause), this.q);
    }, clauses);
    return this;
  }

  filter(...clauses) {
    return this._appendToPath('filter', clauses);
  }

  must(...clauses) {
    return this._appendToPath('must', clauses);
  }

  minimumShouldMatch(min) {
    this.q = R.assocPath(['bool', 'minimum_should_match'], min, this.q);
    return this;
  }

  mustNot(...clauses) {
    return this._appendToPath('must_not', clauses);
  }

  should(...clauses) {
    return this._appendToPath('should', clauses);
  }
}

export default function bool() {
  return new Bool();
}
