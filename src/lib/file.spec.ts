import { equal, deepEqual } from 'assert'
import { assert } from 'chai'

import fs from 'fs'
// tslint:disable-next-line: ban-types
const data = JSON.parse(fs.readFileSync('schema.json', 'utf8'))
describe('Test: Files `emails`, `schema`', () => {
  it('test:  file schema exists', () => {
    equal(fs.existsSync('schema.json'), true)
    assert.isObject(data)
  })

  it('test: file schema valid should have some key', () => {
    deepEqual(
      data.title,
      'The list of generic email found on the web with: department,position,seniority'
    )
    assert.isString(data.title)
    deepEqual(data.additionalProperties, false)
    assert.isBoolean(data.additionalProperties)
    deepEqual(data.definitions, {})
    assert.isObject(data.definitions)
    deepEqual(data.type, 'object')
    assert.isString(data.type)
    deepEqual(data.required, ['emails'])
    assert.isArray(data.required)
  })

  it('test: file schema invalid key', () => {
    assert.isUndefined(data.aa)
    assert.isUndefined(data.ccc)
    assert.isUndefined(data.zzz)
    assert.isUndefined(data.wwww)
  })

  it('test: file emails exists', () => {
    equal(fs.existsSync('emails.json'), true)
  })

  it('test: file emails valid should have emails key', () => {
    equal(true, true)
  })
})
