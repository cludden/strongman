import Query from './query';

export default function terms(field, values) {
  return new Query({ terms: { [field]: values } });
}
