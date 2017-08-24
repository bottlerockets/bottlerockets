/**
 * @flow
 */
import { createHooks } from '../'

describe('Hooks', () => {
  test('create hooks', () => {
    let hooks = createHooks()
    expect(hooks).toBeTruthy()
  })
})
