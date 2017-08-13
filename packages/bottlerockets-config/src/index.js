import rc from 'rc'

/* istanbul ignore next */
function tmpNoopArgvParser () {}

module.exports = {
  rc: () => rc('rocket', require('./defaults'), tmpNoopArgvParser)
}
