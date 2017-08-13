import rc from 'rc'

/* istanbul ignore next */
function tmpNoopArgvParser () {}

module.exports = {
  factory: () => rc('rocket', require('./defaults'), tmpNoopArgvParser)
}
