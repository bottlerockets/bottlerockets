/**
 * @flow
 */
import type { DefaultConfig } from 'types/Config'

module.exports = ({
  prefix: 'rockets',
  connection: 'redis://127.0.0.1:6379',
  verbose: false
}: DefaultConfig)
