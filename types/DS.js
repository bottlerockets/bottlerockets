/**
 * @flow
 */

import type { JobInterface } from 'types/Job'
import type { ConnectionConfig } from 'types/Config'

/**
 * @type {DSQuery}
 */
export type DSQuery = (number | string | Object);

/**
 * @type {DSInterface}
 */
export interface DSInterface {
  connection: ConnectionConfig;

  constructor: (connection: ConnectionConfig) => DSInterface;

  +find: (
    jobName: number,
    query: DSQuery
  ) => Promise<Array<JobInterface>>;

  +update: (
    jobName: string,
    jobId: number,
    args: Object
  ) => Promise<JobInterface>;

  +create: (
    jobName: string,
    args: Object
  ) => Promise<JobInterface>;

  +delete: (
    jobName: string,
    query: DSQuery
  ) => Promise<number>;

  +schedule: (
    jobName: string,
    time: typeof Date,
    args: Object
  ) => Promise<number>;
};
