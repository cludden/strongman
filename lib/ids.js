import Query from './query';
import { isString, isStringArray } from './utils';

export default function ids(values, type) {
  const val = Array.isArray(values) ? values : [values];
  if (!isStringArray(val)) {
    throw new Error('ids: id values must be strings');
  }
  if (type && !isString(type) && !isStringArray(type)) {
    throw new Error('ids: type must be a string or list of strings');
  }
  const q = {
    ids: {
      values: val,
    },
  };
  if (type) {
    q.ids.type = type;
  }
  return new Query(q);
}
