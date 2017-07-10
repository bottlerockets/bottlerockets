/**
 * @flow
 */
import Hooks from '../'

describe('Hooks', () => {
  test('create instance', () => {
    const hooks = new Hooks()
    expect(hooks).toBeInstanceOf(Hooks)
  })
})
