/**
 * @flow
 */
import type { ConnectionConfig } from 'types/Config'
import type { JobInterface } from 'types/Job'
import type { DSInterface, DSQuery } from 'types/DS'

/**
 * @class
 * @implements {DSInterface}
 */
class DSRedis implements DSInterface {
  connection: ConnectionConfig
  Job: JobInterface

  constructor: (connection: ConnectionConfig) => DSInterface

  async find (
    jobName: number,
    query: DSQuery
  ): Promise<Array<JobInterface>> {
    throw new Error('not implemented')
  }

  async update (
    jobName: string,
    jobId: number,
    args: Object
  ): Promise<JobInterface> {
    throw new Error('not implemented')
  }

  async create (
    jobName: string,
    args: Object
  ): Promise<JobInterface> {
    throw new Error('not implemented')
  }

  async delete (
    jobName: string,
    query: DSQuery
  ): Promise<number> {
    throw new Error('not implemented')
  }

  async schedule (
    jobName: string,
    time: typeof Date,
    args: Object
  ): Promise<number> {
    throw new Error('not implemented')
  }
}

module.exports = DSRedis
