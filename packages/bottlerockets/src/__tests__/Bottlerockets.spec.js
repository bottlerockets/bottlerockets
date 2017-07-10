/**
 * @flow
 */
import { Bottlerockets } from '../'

describe('Bottlerockets', () => {
  const config = {
    prefix: 'test',
    connection: {}
  }

  test('create instance', () => {
    const bottlerockets = new Bottlerockets(config)
    expect(bottlerockets).toBeInstanceOf(Bottlerockets)
  })

  test('can register before/after hooks', () => {
    const fnA = () => {}
    const fnB = () => {}
    const fnC = () => {}
    const bottlerockets = new Bottlerockets(config)
    expect(bottlerockets.hooks).toBeInstanceOf(Object)
    bottlerockets.before(fnA)
    bottlerockets.before(fnB)
    bottlerockets.beforeEach(fnB)
    bottlerockets.beforeEach(fnA)
    bottlerockets.afterEach(fnC)
    bottlerockets.afterEach(fnA)
    bottlerockets.after(fnA)
    bottlerockets.after(fnC)
    expect(bottlerockets.hooks).toHaveProperty('before', [fnA, fnB])
    expect(bottlerockets.hooks).toHaveProperty('beforeEach', [fnB, fnA])
    expect(bottlerockets.hooks).toHaveProperty('afterEach', [fnC, fnA])
    expect(bottlerockets.hooks).toHaveProperty('after', [fnA, fnC])
  })
})
