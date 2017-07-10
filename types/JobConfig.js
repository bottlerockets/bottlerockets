/**
 * @flow
 */

/**
 * @type {string|number}
 */
export type JobConfigPriority = 'low' | 'medium' | 'high' | 'critical' | number;

/**
 * @type {string|boolean|Function<Array>}
 */
export type JobConfigUnique = (string | boolean | (args: Array<mixed>) => string | Array<mixed>);

/**
 * @type {Object}
 */
export type DefaultJobConfig = {|
  id?: number,
  name?: string,
  unique?: JobConfigUnique,
  backoff?: boolean | number,
  concurrency?: number,
  priority?: JobConfigPriority,
  runEvery?: string | number,
  delay?: number,
  ttl?: number,
|};
