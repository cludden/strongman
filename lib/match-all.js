import Query from './core/query';

export default function matchAll(boost) {
  if (typeof boost === 'number') {
    return new Query({ match_all: { boost } });
  }
  return new Query({ match_all: {} });
}
