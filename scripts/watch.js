/**
 * Copyright (c) 2014, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const fs = require('fs')
const {execSync} = require('child_process')
const path = require('path')
const chalk = require('chalk')
const getPackages = require('./getPackages')

const BUILD_DIR = 'lib'
const BUILD_CMD = `node ${path.resolve(__dirname, './build.js')}`
const silent = process.argv.includes('--silent')
let filesToBuild = []

const exists = filename => {
  try {
    return fs.statSync(filename).isFile()
  } catch (e) {}
  return false
}
const rebuild = filename => filesToBuild.push(filename)

getPackages().forEach(p => {
  const srcDir = path.resolve(p, 'src')
  try {
    fs.accessSync(srcDir, fs.F_OK)
    fs.watch(path.resolve(p, 'src'), {recursive: true}, (event, filename) => {
      const filePath = path.resolve(srcDir, filename)

      if ((event === 'change' || event === 'rename') && exists(filePath)) {
        if (!silent) {
          console.log(chalk.green('->'), `${event}: ${filename}`)
        }
        rebuild(filePath)
      } else {
        const buildFile = path.resolve(srcDir, '..', BUILD_DIR, filename)
        try {
          fs.unlinkSync(buildFile)
          if (!silent) {
            process.stdout.write(
              chalk.red('  \u2022 ') +
                path.relative(path.resolve(srcDir, '..', '..'), buildFile) +
                ' (deleted)' +
                '\n'
            )
          }
        } catch (e) {}
      }
    })
  } catch (e) {
    // doesn't exist
  }
})

setInterval(() => {
  if (filesToBuild.length) {
    filesToBuild = []
    try {
      execSync(`${BUILD_CMD} ${filesToBuild.join(' ')} ${process.argv.slice(2)}`, {stdio: [0, 1, 2]})
    } catch (e) {}
  }
}, 100)

if (!silent) {
  console.log(chalk.red('->'), chalk.cyan('Watching for changes...'))
}
