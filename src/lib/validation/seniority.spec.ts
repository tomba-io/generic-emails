import { strictEqual } from 'assert'
//import { assert } from 'chai'

// import error from './../Exception/GenericEmailException'
import seniority from './seniority'

describe('test: Seniority', () => {
  it('test: should be valid seniority', () => {
    strictEqual(seniority.validate('junior'), true)
    strictEqual(seniority.validate('senior'), true)
    strictEqual(seniority.validate('executive'), true)
    strictEqual(seniority.validate(null), true)
  })

  /** just add type
  it('test: should be invalid seniority', () => {
    assert.throws(
      () => {
        seniority.validate('xxxxxxxxx')
      },
      error,
      'Invalid seniority name'
    )
  })
  */
})
