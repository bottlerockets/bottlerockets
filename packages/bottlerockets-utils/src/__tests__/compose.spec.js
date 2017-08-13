const compose = require('../compose')
const createKlass = require('./providers/klass')

describe('Bottlerockets Utils', () => {
  test('compose a class', () => {
    let Klass = compose(...[
      createKlass('A', { a: 1 }),
      createKlass('B', { b: 1 }),
      createKlass('C', { a: 2 })
    ])

    let instance = new Klass()

    expect(Klass.staticTest).toBe(true)
    expect(Klass.name).toBe('KlassProvided')
    expect(instance.a).toBe(1)
    expect(instance.b).toBe(1)
  })
})
