/**
 * @flow
 */
import type { JobId } from 'types/Job'
import type { DefaultJobConfig } from 'types/JobConfig'
import type { DSInterface } from 'types/DS'

/**
 * @class
 * @implements {DSInterface}
 */
class Job {
  /**
   * @optional
   * @type {string|number}
   */
  id: JobId

  /**
   * @type {string}
   */
  name: string

  /**
   * @type {DefaultJobConfig}
   */
  config: DefaultJobConfig

  /**
   * @type {boolean}
   */
  exists: boolean

  /**
   * @type {mixed[]}
   */
  args: Array<mixed>

  /**
   * Create a Bottlerockets queue
   */
  constructor (queue: Object, config: DefaultJobConfig) {
    this.id = null
    this.config = config
  }
}

module.exports = Job
