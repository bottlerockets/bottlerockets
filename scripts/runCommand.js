const spawn = require('child_process').spawnSync
const chalk = require('chalk')

module.exports = function runCommand (cmd, args, cwd) {
  if (!cwd) {
    cwd = __dirname
  }

  const displayArgs = args.length > 25
    ? args.slice(0, 25) + '...'
    : args.join(' ')
  console.log(chalk.dim('$ cd ' + cwd + `\n$ ${cmd} ${displayArgs}\n`))
  const result = spawn(cmd, args, {
    cwd,
    stdio: 'inherit'
  })
  if (result.error || result.status !== 0) {
    throw new Error(`Error running command.\n${result.error.toString()}`)
  }
}
