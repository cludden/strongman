import Query from './core/query';
import { isObject } from './utils';

export default function term(field, value, options) {
  let val = value;
  if (isObject(options)) {
    val = {
      value,
      ...options,
    };
  }
  return new Query({ term: { [field]: val } });
}
