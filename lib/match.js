import Query from './core/query';
import { isObject, isString } from './utils';

export default function match(field, query, options) {
  if (!isString(field)) {
    throw new Error('match: field must be a string');
  }
  if (!isString(query)) {
    throw new Error('match: query must be a string');
  }
  let val = query;
  if (isObject(options)) {
    val = {
      query,
      ...options,
    };
  }
  return new Query({ match: { [field]: val } });
}
