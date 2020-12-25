import { equal } from 'assert'
//import { assert } from 'chai'

// import error from './../Exception/GenericEmailException'
import seniority from './seniority'

describe('test: Seniority', () => {
  it('test: should be valid seniority', () => {
    equal(seniority.validate('junior'), true)
    equal(seniority.validate('senior'), true)
    equal(seniority.validate('executive'), true)
    equal(seniority.validate(null), true)
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
