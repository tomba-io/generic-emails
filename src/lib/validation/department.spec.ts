import { equal } from 'assert'
// import { assert } from 'chai'

// import error from './../Exception/GenericEmailException'
import department from './department'

describe('test: Department', () => {
  it('test: should be valid department', () => {
    equal(department.validate('engineering'), true)
    equal(department.validate('sales'), true)
    equal(department.validate('finance'), true)
    equal(department.validate('hr'), true)
    equal(department.validate('it'), true)
    equal(department.validate('marketing'), true)
    equal(department.validate('operations'), true)
    equal(department.validate('management'), true)
    equal(department.validate('executive'), true)
    equal(department.validate('legal'), true)
    equal(department.validate('support'), true)
    equal(department.validate('communication'), true)
    equal(department.validate('software'), true)
    equal(department.validate('security'), true)
    equal(department.validate('pr'), true)
    equal(department.validate('warehouse'), true)
    equal(department.validate('diversity'), true)
    equal(department.validate('administrative'), true)
    equal(department.validate('facilities'), true)
    equal(department.validate('accounting'), true)
    equal(department.validate(null), true)
  })

  /** just add type
  it('test: should be invalid department', () => {
    assert.throws(
      () => {
        department.validate('xxxxxxxxx')
      },
      error,
      'Invalid department name'
    )
  })
   */
})
