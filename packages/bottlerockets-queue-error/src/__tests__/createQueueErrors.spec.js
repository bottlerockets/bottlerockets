import createQueueErrors from '../createQueueErrors'

describe('QueueError', () => {
  test('can create error classes', () => {
    const QueueError = createQueueErrors([{
      name: 'ErrorA',
      defaultMessage: 'MessageA',
      code: '001'
    }, {
      name: 'ErrorB',
      defaultMessage: 'MessageB',
      code: '002'
    }])

    const errorA = new QueueError.ErrorA()
    const errorB = new QueueError.ErrorB()

    expect(errorA).toBeInstanceOf(QueueError.ErrorA)
    expect(errorA).toHaveProperty('message', 'MessageA')
    expect(errorA).toHaveProperty('code', '001')
    expect(errorB).toHaveProperty('message', 'MessageB')
    expect(errorB).toHaveProperty('code', '002')

    expect(QueueError.is(errorA)).toBeTruthy()
    expect(QueueError.is(new Error())).not.toBeTruthy()
  })
})
