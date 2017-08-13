import Config from '../'

describe('Bottlerockets Config Loader', () => {
  test('can extend .rocketrc', () => {
    const CWD = process.cwd()
    process.chdir(__dirname)
    const config = Config.factory()
    process.chdir(CWD)

    expect(config)
      .toHaveProperty('prefix', 'TESTPREFIX')

    expect(config)
      .toHaveProperty('connection', 'test://test:0')
  })
})
