const compose = require('../compose')
const createKlass = require('./providers/klass')

describe('Bottlerockets Utils', () => {
  test('compose a class', () => {
    let klass = compose(...[
      createKlass('A', { a: 1 }),
      createKlass('B', { b: 1 }),
      createKlass('C', { a: 2 })
    ])

    let instance = new klass()

    expect(klass.staticTest).toBe(true)
    expect(klass.name).toBe('KlassProvided')
    expect(instance.a).toBe(1)
    expect(instance.b).toBe(1)
  })
})
