module.exports = function createKlass (name, proto) {
  let Klass = function KlassProvided () {
    this.name = name
  }
  Klass.staticTest = true
  Object.assign(Klass.prototype, proto)
  return Klass
}
