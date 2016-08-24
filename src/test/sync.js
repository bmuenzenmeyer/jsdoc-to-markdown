'use strict'
const TestRunner = require('test-runner')
const jsdoc2md = require('../../')
const a = require('assert')
jsdoc2md._usageStats.disable()

const runner = new TestRunner()
const inputFile = 'src/test/fixture/ignore.js'

if (require('child_process').spawnSync) {
  runner.test('.renderSync({ files })', function () {
    const result = jsdoc2md.renderSync({ files: inputFile, cache: false })
    a.ok(/a visible global/.test(result))
  })

  runner.test('.renderSync({ files, heading-depth: 4 })', function () {
    const result = jsdoc2md.renderSync({ files: inputFile, cache: false, 'heading-depth': 4 })
    a.ok(/#### visible/.test(result))
  })

  runner.test('.renderSync({ files }, { param-list-format: list })', function () {
    const inputFile = 'src/test/fixture/params.js'
    const result = jsdoc2md.renderSync({ files: inputFile, cache: false, 'param-list-format': 'list' })
    a.ok(/- one/.test(result))
  })

  runner.test('.getTemplateDataSync({ files })', function () {
    const result = jsdoc2md.getTemplateDataSync({ files: inputFile, cache: false })
    a.ok(result[0].id)
  })

  runner.test('.getJsdocDataSync({ files })', function () {
    const result = jsdoc2md.getJsdocDataSync({ files: inputFile, cache: false })
    a.ok(result[0].longname)
  })
}
