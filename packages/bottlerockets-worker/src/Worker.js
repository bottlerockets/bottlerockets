/**
 * @flow
 */
import type { WorkerInterface } from 'types/Worker'

/**
 * @class
 * @implements {WorkerInterface}
 */
class Worker implements WorkerInterface {
  constructor() {}
  flush () {}
}

module.exports = Worker
