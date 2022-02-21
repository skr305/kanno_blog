const fs = require('fs')
const path = require('path')
const prompt = require('prompt-sync')()
const chalk = require('chalk')

const postsPath = path.join(__dirname, '..', 'posts', 'notes')

const templatePath = path.join(__dirname, 'template.md.tpl')

const exists = (path) =>
  new Promise((resolve, reject) =>
    fs.access(path, (err) => {
      if (!err) reject()
      resolve()
    })
  )

;(async () => {
  const promptText = `> You need to specify the post ${chalk.bold('Filename')} (required): `
  const answer = prompt(chalk.hex('#bdbdbd')(promptText))
  if (!answer) {
    console.log(chalk.yellow('  Aborted. Nothing has changed.\n'))
    process.exit(1)
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(answer)) {
    console.log(chalk.red('  Cancelled. Allowed characters: [A-z, 0-9, _, -]\n'))
    process.exit(1)
  }

  const filePath = path.join(postsPath, `${answer}.md`)
  try {
    await exists(filePath)
  } catch (err) {
    console.log(chalk.red(`  Aborted. File ${filePath} is exists.\n`))
    process.exit(1)
  }
  let content = fs.readFileSync(templatePath, 'utf-8')
  const args = { title: answer, date: new Date().toISOString() }

  Object.keys(args).forEach((key) => {
    const regexp = new RegExp(`{{ ${key} }}`, 'g')
    content = content.replace(regexp, args[key])
  })

  fs.writeFileSync(filePath, content, 'utf-8')
  console.log(chalk.cyan('  Successful. Enjoy.'))
  process.exit(0)
})()
