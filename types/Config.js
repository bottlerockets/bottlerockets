/**
 * @flow
 */

/**
 * @type {ConnectionURIConfig}
 */
export type ConnectionURIStringConfig = string

export type ConnectionURIConfig = ConnectionURIStringConfig | {
  type?: string,
  uri: string
}

export type ConnectionConfig = {
  type: string,
  host?: string,
  port?: number | string,
  database?: string,
  username?: string,
  password?: string
}

/**
 * @type {DefaultConfig}
 */
export type DefaultConfig = {
  prefix?: string,
  verbose?: boolean,
  config?: string,
  configs?: string[],
  connection: ConnectionConfig | ConnectionURIConfig
}
