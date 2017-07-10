const path = require('path')
const runCommand = require('./runCommand')

console.log(`Setting up Bottlerocket's development environment...`)

const isWindows = process.platform === 'win32'
const lerna = isWindows ? 'lerna.cmd' : 'lerna'
const lernaCmd = path.resolve(__dirname, '../node_modules/.bin/' + lerna)
const args = process.env.CI ? ['bootstrap', '--concurrency=1'] : ['bootstrap']

runCommand(lernaCmd, args, path.resolve(__dirname, '..'))
