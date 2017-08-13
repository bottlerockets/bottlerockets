/**
 * @flow
 */
import type { DefaultConfig } from 'types/Config'
import type { DSInterface } from 'types/DS'
import type { WorkerInterface } from 'types/Worker'
import parseConfig from './parseConfig'
import createCaller from './createCaller'

/**
 * @class
 */
class Bottlerockets {
  /**
   * @type {DefaultConfig}
   */
  config: DefaultConfig

  /**
   * @type {DSInterface}
   */
  ds: DSInterface

  /**
   * @type {Map}
   */
  jobWorkers: Map<string, WorkerInterface[]>

  /**
   * @type {boolean}
   */
  isFlushing: boolean

  /**
   * Create a Bottlerockets queue
   */
  constructor (config: DefaultConfig) {
    this.jobWorkers = new Map()
    this.configure(config)
    return createCaller(this)
  }

  /**
   * Call a job with some data
   * @param  {[type]} name:    string        [description]
   * @param  {[type]} payload: Object        [description]
   * @param  {[type]} options: Object        [description]
   * @return {[type]}          [description]
   */
  async call (name: string, payload: Object, options: Object) {

  }

  /**
   * Update Bottlerockets queue configuration
   *
   * @param  {Object} config
   * @return {Bottlerockets} For optional method chaining
   */
  configure (config: DefaultConfig): Bottlerockets {
    this.config = Object.assign({}, parseConfig(this, config))
    return this
  }
}

module.exports = Bottlerockets
