'use strict'
const TestRunner = require('test-runner')
const jsdoc2md = require('../../')
const a = require('assert')
const fs = require('fs')
try {
  fs.mkdirSync('tmp-test')
} catch (err) {
  // exists
}
jsdoc2md._usage.defaults.set('tid', 'UA-70853320-4')
jsdoc2md._usage.queuePath = 'tmp-test/unsent.json'
jsdoc2md._usage._lastSentPath = 'tmp-test/lastSent.json'
process.on('beforeExit', () => jsdoc2md._usage.send())

const runner = new TestRunner()
const inputFile = 'src/test/fixture/ignore.js'

runner.test('.render({ files })', function () {
  return jsdoc2md.render({ files: inputFile })
    .then(result => a.ok(/a visible global/.test(result)))
})

runner.test('.render({ data })', function () {
  const data = [
    {
      id: 'visible',
      longname: 'visible',
      name: 'visible',
      kind: 'member',
      scope: 'global',
      description: 'a visible global',
      meta: {
        lineno: 4,
        filename: 'ignore.js'
      },
      order: 0
    },
    {
      id: 'invisible',
      longname: 'invisible',
      name: 'invisible',
      kind: 'member',
      scope: 'global',
      description: 'an ignored global',
      ignore: true,
      meta: {
        lineno: 10,
        filename: 'ignore.js'
      },
      order: 1
    }
  ]
  return jsdoc2md.render({ data: data })
    .then(result => a.ok(/a visible global/.test(result)))
})

runner.test('.render({ files, heading-depth: 4 })', function () {
  return jsdoc2md.render({ files: inputFile, 'heading-depth': 4 })
    .then(result => a.ok(/#### visible/.test(result)))
})

runner.test('.render({ files, param-list-format: list })', function () {
  const inputFile = 'src/test/fixture/params.js'
  return jsdoc2md.render({ files: inputFile, 'param-list-format': 'list' })
    .then(result => a.ok(/- one/.test(result)))
})

runner.test('.getTemplateData({ files })', function () {
  return jsdoc2md.getTemplateData({ files: inputFile })
    .then(result => a.ok(result[0].id))
})

runner.test('.getJsdocData({ files })', function () {
  return jsdoc2md.getJsdocData({ files: inputFile })
    .then(result => a.ok(result[0].longname))
})

runner.test('.render({ files, noCache })', function () {
  return jsdoc2md.render({ files: inputFile, noCache: true })
    .then(result => a.ok(/a visible global/.test(result)))
})

runner.test('.render({ data, noCache })', function () {
  const data = [
    {
      id: 'visible',
      longname: 'visible',
      name: 'visible',
      kind: 'member',
      scope: 'global',
      description: 'a visible global',
      meta: {
        lineno: 4,
        filename: 'ignore.js'
      },
      order: 0
    },
    {
      id: 'invisible',
      longname: 'invisible',
      name: 'invisible',
      kind: 'member',
      scope: 'global',
      description: 'an ignored global',
      ignore: true,
      meta: {
        lineno: 10,
        filename: 'ignore.js'
      },
      order: 1
    }
  ]
  return jsdoc2md.render({ data: data, noCache: true })
    .then(result => a.ok(/a visible global/.test(result)))
})

runner.test('.render({ files, heading-depth: 4, noCache })', function () {
  return jsdoc2md.render({ files: inputFile, 'heading-depth': 4, noCache: true })
    .then(result => a.ok(/#### visible/.test(result)))
})

runner.test('.render({ files, param-list-format: list, noCache })', function () {
  const inputFile = 'src/test/fixture/params.js'
  return jsdoc2md.render({ files: inputFile, 'param-list-format': 'list', noCache: true })
    .then(result => a.ok(/- one/.test(result)))
})

runner.test('.getTemplateData({ files, noCache })', function () {
  return jsdoc2md.getTemplateData({ files: inputFile, noCache: true })
    .then(result => a.ok(result[0].id))
})

runner.test('.getJsdocData({ files, noCache })', function () {
  return jsdoc2md.getJsdocData({ files: inputFile, noCache: true })
    .then(result => a.ok(result[0].longname))
})
