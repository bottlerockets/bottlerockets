/**
 * @flow
 */
import url from 'url'
import type { DefaultConfig } from 'types/Config'
import Config from 'bottlerockets-config'

type ConfigMap = { [key: string]: any };

module.exports = (bottlerockets: Object, config: ConfigMap = {}): DefaultConfig => {
  let newConfig: ConfigMap = Object.assign({}, Config.factory(), config)
  let connection: ConfigMap = (newConfig.connection: ConfigMap)

  let uri
  if (typeof connection === 'string') {
    uri = url.parse(connection)
  } else if (typeof connection === 'object' && connection.uri) {
    uri = url.parse(connection.uri)
  }

  if (uri) {
    connection = {}
    connection.type = uri.protocol ? uri.protocol.slice(0, uri.protocol.length - 1) : 'redis'
    connection.host = uri.hostname
    connection.port = uri.port
    connection.pathname = uri.pathname
    delete connection.uri
    newConfig.connection = connection
  }
  return newConfig
}
