/**
 * @flow
 */
import type { Hook } from 'types/Hook'

const createHooks = (): void => {
  let hooks = Object.create(null)
  let hookCallbacks: Hook[] = []

  Hooks.add = (hook: Hook) => {
    return
  }

  return hooks
}

module.exports = createHooks
