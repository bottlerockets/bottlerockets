/**
 * @flow
 */

// @TODO Finish Proxy based RPC implementation
function createCaller (bottlerockets: Object) {
  function Bottlerockets (name, payload, options) {
    return bottlerockets.call(name, payload, options)
  }

  return Object.setPrototypeOf(Bottlerockets, bottlerockets)
}

module.exports = createCaller
