import Query from './query';
import { isObject } from './utils';

export default function match(field, query, options) {
  let val = query;
  if (isObject(options)) {
    val = {
      query,
      ...options,
    };
  }
  return new Query({ match: { [field]: val } });
}
