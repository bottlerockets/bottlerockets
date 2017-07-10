const fs = require('fs')
const path = require('path')
const File = require('vinyl')
const vfs = require('vinyl-fs')
const _ = require('lodash')
const concat = require('concat-stream')
const GithubSlugger = require('github-slugger')
const createFormatters = require('documentation').util.createFormatters
const LinkerStack = require('documentation').util.LinkerStack
const hljs = require('highlight.js')

const documentationConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../.documentation.json'))
)

function isFunction (section) {
  return (
    section.kind === 'function' ||
    (section.kind === 'typedef' &&
      section.type.type === 'NameExpression' &&
      section.type.name === 'Function')
  )
}

module.exports = function (comments, config) {
  const linkerStack = new LinkerStack(
    config
  ).namespaceResolver(comments, function (namespace) {
    const slugger = new GithubSlugger()
    return '#' + slugger.slug(namespace)
  })

  const formatters = createFormatters(linkerStack.link)

  hljs.configure(config.hljs || {})

  const sharedImports = {
    imports: {
      slug (str) {
        const slugger = new GithubSlugger()
        return slugger.slug(str)
      },
      shortSignature (section) {
        let prefix = ''
        if (section.kind === 'class') {
          prefix = 'new '
        } else if (!isFunction(section)) {
          return section.name
        }
        return prefix + section.name + formatters.parameters(section, true)
      },
      signature (section) {
        let returns = ''
        let prefix = ''
        if (section.kind === 'class') {
          prefix = 'new '
        } else if (!isFunction(section)) {
          return section.name
        }
        if (section.returns.length) {
          returns = ': ' + formatters.type(section.returns[0].type)
        }
        return prefix + section.name + formatters.parameters(section) + returns
      },
      md (ast, inline) {
        if (
          inline &&
          ast &&
          ast.children.length &&
          ast.children[0].type === 'paragraph'
        ) {
          ast = {
            type: 'root',
            children: ast.children[0].children.concat(ast.children.slice(1))
          }
        }
        return formatters.markdown(ast)
      },
      formatType: formatters.type,
      autolink: formatters.autolink,
      highlight (example) {
        if (config.hljs && config.hljs.highlightAuto) {
          return hljs.highlightAuto(example).value
        }
        return hljs.highlight('js', example).value
      }
    }
  }

  let docs = []

  documentationConfig.toc.forEach(name => {
    comments.forEach(comment => {
      if (comment.name === name) docs.push(comment)
    })
  })

  docs = docs
    .filter(comment => comment.errors.length === 0)
    .map(comment => {
      comment.implements = []
      comment.tags.forEach(tag => {
        if (tag.title === 'implements') {
          comment.implements.push(tag.type)
        }
      })
      return comment
    })

  sharedImports.imports.renderSectionList = _.template(
    fs.readFileSync(path.join(__dirname, 'section_list._'), 'utf8'),
    sharedImports
  )
  sharedImports.imports.renderSection = _.template(
    fs.readFileSync(path.join(__dirname, 'section._'), 'utf8'),
    sharedImports
  )
  sharedImports.imports.renderNote = _.template(
    fs.readFileSync(path.join(__dirname, 'note._'), 'utf8'),
    sharedImports
  )

  const pageTemplate = _.template(
    fs.readFileSync(path.join(__dirname, 'index._'), 'utf8'),
    sharedImports
  )

  // push assets into the pipeline as well.
  return new Promise(resolve => {
    vfs.src([path.resolve(__dirname, 'assets/**')], { base: __dirname }).pipe(
      concat(function (files) {
        resolve(
          files.concat(
            new File({
              path: 'index.html',
              contents: Buffer.from(
                pageTemplate({
                  docs,
                  config
                }),
                'utf8'
              )
            })
          )
        )
      })
    )
  })
}
