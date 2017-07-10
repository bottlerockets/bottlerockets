function createErrors (ErrorClass, errors) {
  errors.forEach(error => {
    const { name, code, defaultMessage } = error
    const QueueError = function (message) {
      this.name = `${name}Error`
      this.code = code
      this.message = message || defaultMessage
      ErrorClass.call(this)
      Error.captureStackTrace(this, QueueError)
    }
    Object.setPrototypeOf(QueueError.prototype, ErrorClass.prototype)
    ErrorClass[name] = QueueError
  })
}

module.exports = createErrors
