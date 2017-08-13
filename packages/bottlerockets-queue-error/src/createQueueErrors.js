function QueueError (message) {
  Error.call(this)
  Error.captureStackTrace(this)
}

Object.setPrototypeOf(QueueError.prototype, Error.prototype)

let _QueueError = QueueError

function createQueueErrors (errors) {
  let errorClasses = {}
  errorClasses.is = (klass) => (klass instanceof _QueueError)

  errors.forEach(error => {
    const { name, code, defaultMessage } = error
    const QueueError = function (message) {
      _QueueError.call(this, message)
      Error.captureStackTrace(this, QueueError)
      this.name = `${name}Error`
      this.code = code
      this.message = message || defaultMessage
    }
    Object.setPrototypeOf(QueueError.prototype, _QueueError.prototype)
    errorClasses[name] = QueueError
  })

  return errorClasses
}

module.exports = createQueueErrors
