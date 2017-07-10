/**
 * @flow
 */
import type { JobInterface } from 'types/Job'

/**
 * @class
 */
export interface WorkerInterface {
  job?: JobInterface;
  +flush: () => void;
};
