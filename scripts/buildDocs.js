const path = require('path')
const fs = require('fs')
const documentation = require('documentation')
const streamArray = require('stream-array')
const vinylFs = require('vinyl-fs')

const PROJECT_VERSION = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../lerna.json'), 'utf8')
).version

console.log('Building Bottlerockets documentation...')

const options = {
  noPackage: true,
  'project-name': 'Bottlerockets',
  'project-homepage': 'https://bottlerockets.co',
  'project-version': PROJECT_VERSION,
  paths: ['./'],
  output: path.resolve(__dirname, '../docs'),
  parseExtension: ['js'],
  theme: './scripts/docs-theme',
  format: 'html'
}

documentation.build(['types/**.js', 'packages/*/src/**.js'], options)
  .then(comments => documentation.formats[options.format](comments, options))
  .then(output => {
    streamArray(output).pipe(vinylFs.dest('./docs'))
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
