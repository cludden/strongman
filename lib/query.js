import R from 'ramda';

const append = value => (leaf) => {
  let val = value;
  if (R.is(Function, val)) {
    val = val(new Query()).get();
  }
  if (!leaf) {
    return val;
  }
  if (!Array.isArray(leaf)) {
    return [leaf, val];
  }
  return leaf.concat(val);
};

export default class Query {
  constructor() {
    this.q = {};
  }

  addFilter(...filters) {
    R.forEach((filter) => {
      this.q = R.over(R.lensPath(['bool', 'filter', 'bool', 'must']), append(filter), this.q);
    }, filters);
    return this;
  }

  andQuery(...clauses) {
    R.forEach((clause) => {
      if (!Object.keys(this.q).length) {
        this.q = clause;
      } else {
        if (!R.has('bool', this.q)) {
          this.q = R.assocPath(['bool', 'must'], this.q, {});
        }
        this.q = R.over(R.lensPath(['bool', 'must']), append(clause), this.q);
      }
    }, clauses);
    return this;
  }

  get() {
    return this.q;
  }

  minimumShouldMatch(min) {
    this.q = R.assocPath(['bool', 'minimum_should_match'], min, this.q);
    return this;
  }

  notFilter(...clauses) {
    R.forEach((clause) => {
      this.q = R.over(R.lensPath(['bool', 'must_not']), append(clause), this.q);
    }, clauses);
    return this;
  }

  orFilter(...filters) {
    R.forEach((filter) => {
      this.q = R.over(R.lensPath(['bool', 'filter', 'bool', 'should']), append(filter), this.q);
    }, filters);
    return this;
  }

  orQuery(...clauses) {
    R.forEach((clause) => {
      this.q = R.over(R.lensPath(['bool', 'should']), append(clause), this.q);
    }, clauses);
    return this;
  }

  query(...clauses) {
    return this.andQuery(...clauses);
  }
}

export function exists(field) {
  return { exists: { field } };
}

export function term(field, val) {
  return { term: { [field]: val } };
}

export function terms(field, vals) {
  return { terms: { [field]: vals } };
}
