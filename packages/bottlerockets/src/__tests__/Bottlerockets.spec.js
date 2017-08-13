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
    expect(typeof bottlerockets).toBe('function')
  })
})
