const ignoreStatics = Object.getOwnPropertyNames(Object)

function compose (...args) {
  let Klass = function Klass () {}

  while (args.length > 0) {
    let Parent = args.pop()

    // Mixin prototype
    Object.assign(Klass.prototype, Parent.prototype)

    // Update class name
    Object.defineProperty(Klass, 'name', {
      value: Parent.name
    })

    // Hoist statics
    Object.getOwnPropertyNames(Parent)
      .filter(prop => !~ignoreStatics.indexOf(prop))
      .forEach(prop => {
        Klass[prop] = Parent[prop]
      })
  }

  return Klass
}

module.exports = compose
