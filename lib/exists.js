import Query from './query';

export default function exists(field) {
  return new Query({ exists: { field } });
}
