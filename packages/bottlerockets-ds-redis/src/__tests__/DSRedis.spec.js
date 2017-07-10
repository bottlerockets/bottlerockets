/**
 * @flow
 */
import DSRedis from '../DSRedis'

describe('DSRedis', () => {
  test('can connect', () => {
    const connection = {
      type: 'redis'
    }

    const redis = new DSRedis(connection)
    expect(redis).toBeInstanceOf(DSRedis)
  })
})
