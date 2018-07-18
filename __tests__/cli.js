const sao = require('sao')
const path = require('path')

const template = path.join(__dirname, '../')

const getPackageFields = stream => {
  pkg = JSON.parse(stream.fileContents('package.json'))
  delete pkg.name
  delete pkg.author
  delete pkg.version
  delete pkg.description
  return pkg
}

const createStream = async (answers) => (await sao.mockPrompt(template, answers))

describe('cli.js', async () => {
  test('defaults', async () => {
    const stream = await createStream()
    expect(stream.fileList).toMatchSnapshot()
    expect(getPackageFields(stream)).toMatchSnapshot()
  })

  describe('use Babel', async () => {
    test('defaults', async () => {
      const stream = await createStream()
      expect(stream.fileList).toMatchSnapshot()
      expect(getPackageFields(stream)).toMatchSnapshot()
    })
  })

  describe('use TypeScript', async () => {
    test('defaults', async () => {
      const stream = await createStream({ language: 'TypeScript' })
      expect(stream.fileList).toMatchSnapshot()
      expect(getPackageFields(stream)).toMatchSnapshot()
    })
  })
})
