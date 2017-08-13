/**
 * @flow
 */
import Bottlerockets from '../Bottlerockets'

describe('Bottlerockets', () => {
  describe('parseConfig', () => {
    test('can use connection as string URI', () => {
      const type = 'anything'
      const host = 'foo'
      const port = '2000'
      const pathname = '/1000'

      const bottlerockets = new Bottlerockets({
        connection: `${type}://${host}:${port}${pathname}`
      })

      expect(bottlerockets.config)
        .toHaveProperty('connection')

      expect(bottlerockets.config.connection)
        .toHaveProperty('type', type)

      expect(bottlerockets.config.connection)
        .toHaveProperty('host', host)

      expect(bottlerockets.config.connection)
        .toHaveProperty('port', port)
    })

    test('can use connection object', () => {
      let connection = {
        type: 'mongodb',
        host: 'test.com',
        port: '500'
      }

      const bottlerockets = new Bottlerockets({ connection })

      expect(bottlerockets.config)
        .toHaveProperty('connection')

      expect(bottlerockets.config.connection)
        .toHaveProperty('type', connection.type)

      expect(bottlerockets.config.connection)
        .toHaveProperty('host', connection.host)

      expect(bottlerockets.config.connection)
        .toHaveProperty('port', connection.port)
    })

    test('can use connection object with property `uri` as string URI', () => {
      const type = 'anything'
      const host = 'foo'
      const port = '2000'
      const pathname = '/1000'

      const bottlerockets = new Bottlerockets({
        connection: {
          uri: `${type}://${host}:${port}${pathname}`
        }
      })

      expect(bottlerockets.config)
        .toHaveProperty('connection')

      expect(bottlerockets.config.connection)
        .toHaveProperty('type', type)

      expect(bottlerockets.config.connection)
        .toHaveProperty('host', host)

      expect(bottlerockets.config.connection)
        .toHaveProperty('port', port)

      expect(bottlerockets.config.connection)
        .toHaveProperty('pathname', pathname)
    })
  })
})
