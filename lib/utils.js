/**
 * Determine if a variable is plain old javascript object (non array, non null, non date)
 * @param  {*} object
 * @return {Boolean}
 */
export function isObject(object) {
  return object && typeof object === 'object' && !Array.isArray(object) && !(object instanceof Date);
}
