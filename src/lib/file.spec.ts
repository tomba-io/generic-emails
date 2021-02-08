import { equal, deepEqual } from 'assert'
import { assert } from 'chai'

import email from './validation/emails'
import generic from './generic'
import department from './validation/department'
import seniority from './validation/seniority'

import fs from 'fs'

const schema = JSON.parse(fs.readFileSync('schema.json', 'utf8'))
const emails = JSON.parse(fs.readFileSync('emails.json', 'utf8')).emails
describe('Test: Files `emails`, `schema`', () => {
  it('test:  file schema exists', () => {
    equal(fs.existsSync('schema.json'), true)
    assert.isObject(schema)
  })

  it('test: file schema keys and types', () => {
    deepEqual(
      schema.title,
      'The list of generic email found on the web with: department,position,seniority'
    )
    assert.isString(schema.title)
    deepEqual(schema.additionalProperties, false)
    assert.isBoolean(schema.additionalProperties)
    deepEqual(schema.definitions, {})
    assert.isObject(schema.definitions)
    deepEqual(schema.type, 'object')
    assert.isString(schema.type)
    deepEqual(schema.required, ['emails'])
    assert.isArray(schema.required)
  })

  it('test: file schema invalid key', () => {
    assert.isUndefined(schema.aa)
    assert.isUndefined(schema.ccc)
    assert.isUndefined(schema.zzz)
    assert.isUndefined(schema.wwww)
  })

  it('test: file emails exists', () => {
    equal(fs.existsSync('emails.json'), true)
    assert.isArray(emails)
  })

  it('test: file emails keys and types', () => {
    deepEqual(emails[0].email, '0')
    assert.isString(emails[0].email)
    assert.isNull(emails[0].department)
    assert.isNull(emails[0].position)
    assert.isNull(emails[0].seniority)
  })

  it('test: file emails invalid key', () => {
    assert.isUndefined(emails.aa)
    assert.isUndefined(emails.ccc)
    assert.isUndefined(emails.zzz)
    assert.isUndefined(emails.wwww)
  })

  it('test: file emails Email if is Generic', (done) => {
    emails.map(async (i: any) => {
      equal(await generic.isGeneric(i.email), true)
    })
    done()
  }).timeout(40000)

  it('test: file emails Email validation', () => {
    emails.map((i: any) => {
      if (i.email != '') {
        assert.isTrue(email.validate(`${i.email}@tomba.io`))
      }
    })
  })

  it('test: file emails Department', () => {
    emails.map((i: any) => {
      assert.isTrue(department.validate(i.department))
    })
  })

  it('test: file emails seniority', () => {
    emails.map((i: any) => {
      equal(seniority.validate(i.seniority), true)
    })
  })

  it('test: delicate emails', () => {
    const uniqueEmail = new Set(
      emails.map((v: { email: string }) => {
        return v.email
      })
    )
    deepEqual(uniqueEmail.size, emails.length)
  })
})
