const superb = require('superb')

module.exports = {
  prompts: {
    name: {
      message: 'Project name',
      default: ':folderName:'
    },
    description: {
      message: 'Project description',
      default: `My ${superb.random()} NPM package`
    },
    author: {
      type: 'string',
      message: 'Author name',
      default: ':gitUser:',
      store: true
    },
    format: {
      message: 'Choose code formatter',
      type: 'list',
      choices: ['Don\'t use', 'prettier'],
      default: 'prettier'
    },
    unit: {
      message: 'Unit testing',
      type: 'list',
      choices: ['Don\'t use', 'Jest'],
      default: 'Jest'
    },
    language: {
      message: 'Choose a build environment',
      type: 'list',
      choices: ['Babel', 'TypeScript']
    },
    pm: {
      message: 'Choose a package manager',
      choices: ['yarn', 'npm'],
      type: 'list',
      default: 'yarn'
    }
  },
  filters: {
    'src/index.js': 'language === "Babel"',
    'src/index.ts': 'language === "TypeScript"',
    'spec/': 'unit === "Jest"',
    'spec/src/index.spec.js': 'language === "Babel"',
    'spec/src/index.spec.ts': 'language === "TypeScript"',
    '.babelrc': 'language === "Babel"',
    'tsconfig.json': 'language === "TypeScript"'
  },
  post(
    { npmInstall, yarnInstall, gitInit, chalk, isNewFolder, folderName },
    { meta }
  ) {
    gitInit()

    if (meta.answers.pm === 'yarn') yarnInstall()
    else npmInstall()

    const cd = () => {
      if (isNewFolder) {
        console.log(`    ${chalk.cyan('cd')} ${folderName}`)
      }
    }

    console.log()
    console.log(chalk.bold(`  To get started:\n`))
    cd()
    console.log(`    ${meta.answers.pm} ${meta.answers.pm === 'npm' ? 'run ' : ''}dev\n`)
    console.log(chalk.bold(`  To build & publish:\n`))
    cd()
    console.log(`    ${meta.answers.pm} ${meta.answers.pm === 'npm' ? 'run ' : ''}build`)
    console.log(`    npm publish`)
    console.log()
  }
}
