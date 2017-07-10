/**
 * @flow
 */
import type { DefaultConfig } from 'types/Config'
import type { HookCallback } from 'types/Hook'
import type { DSInterface } from 'types/DS'
import type { WorkerInterface } from 'types/Worker'
import { Job } from 'bottlerockets-job'
import { Worker } from 'bottlerockets-worker'
import QueueError from 'bottlerockets-queue-error'
import parseConfig from './parseConfig'

/**
 * @class
 */
class Bottlerockets {
  /**
   * @type {DefaultConfig}
   */
  config: DefaultConfig;

  ds: DSInterface;

  /**
   * @type {HookCallback[]}
   */
  hooks: {
    before: HookCallback[],
    beforeEach: HookCallback[],
    afterEach: HookCallback[],
    after: HookCallback[],
  };

  /**
   * @type {Map}
   */
  jobWorkers: Map<string, WorkerInterface[]>;

  /**
   * @type {boolean}
   */
  isFlushing: boolean;

  /**
   * Create a Bottlerockets queue
   */
  constructor (config: DefaultConfig) {
    this.jobWorkers = new Map()
    this.hooks = {
      before: [],
      beforeEach: [],
      afterEach: [],
      after: []
    }

    this.configure(config)
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
  /**
   * Before Hook
   *
   * @return {Bottlerockets} For optional method chaining
   */
  before (hook: HookCallback) {
    if (typeof hook !== 'function') {
      throw new QueueError.InvalidHookBefore('Invalid `before` handler')
    }
    this.hooks.before.push(hook)
    return this
  }

  /**
   * Before Each Hook
   *
   * @return {Bottlerockets} For optional method chaining
   */
  beforeEach (hook: HookCallback) {
    if (typeof hook !== 'function') {
      throw new QueueError.InvalidHookBeforeEach('Invalid `beforeEach` handler')
    }
    this.hooks.beforeEach.push(hook)
    return this
  }

  /**
   * After Each Hook
   *
   * @return {Bottlerockets} For optional method chaining
   */
  afterEach (hook: HookCallback) {
    if (typeof hook !== 'function') {
      throw new QueueError.InvalidHookAfterEach('Invalid `afterEach` handler')
    }
    this.hooks.afterEach.push(hook)
    return this
  }

  /**
   * After Hook
   *
   * @return {Bottlerockets} For optional method chaining
   */
  after (hook: HookCallback) {
    if (typeof hook !== 'function') {
      throw new QueueError.InvalidHookAfter('Invalid `after` handler')
    }
    this.hooks.after.push(hook)
    return this
  }

  /**
   * Process Job
   *
   * @param  {Job} job
   * @return {Bottlerockets} For optional method chaining
   */
  process (job: Job) {
    const jobWorkerSet = []
    for (let $ = parseInt(job.config.concurrency); $--;) {
      jobWorkerSet.push(new Worker(job.config.name))
    }
    this.jobWorkers.set(job.config.name, jobWorkerSet)
  }

  /**
   * Flush Work
   * @return {Bottlerockets} For optional method chaining
   */
  flush () {
    for (let [, workers] of this.jobWorkers) {
      workers.forEach(worker => worker.flush())
    }
  }
}

module.exports = Bottlerockets
