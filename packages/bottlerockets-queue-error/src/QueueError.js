const createErrors = require('./createErrors')

function QueueError () {
  Error.call(this)
  Error.captureStackTrace(this)
}

Object.setPrototypeOf(QueueError.prototype, Error.prototype)

createErrors(QueueError, [{
  name: 'InvalidHookBefore',
  defaultMessage: 'Bottlerockets#before: first argument must be a function.',
  code: '001'
}, {
  name: 'InvalidHookBeforeEach',
  defaultMessage: 'Bottlerockets#beforeEach: first argument must be a function.',
  code: '001'
}, {
  name: 'InvalidHookAfterEach',
  defaultMessage: 'Bottlerockets#afterEach: first argument must be a function.',
  code: '001'
}, {
  name: 'InvalidHookAfter',
  defaultMessage: 'Bottlerockets#after: first argument must be a function.',
  code: '001'
}, {
  name: 'InvalidClientConnection',
  defaultMessage: 'Bottlerockets#configure: connection must be a valid URL, function, or object.',
  code: '002'
}, {
  name: 'JobCorruptJSON',
  defaultMessage: 'Job#fromJSON: Job has invalid JSON.',
  code: '003'
}])

module.exports = QueueError
