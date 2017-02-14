import Query from './core/query';

export default function exists(field) {
  return new Query({ exists: { field } });
}
