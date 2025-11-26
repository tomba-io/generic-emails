import { strictEqual } from 'assert'
// import { assert } from 'chai'

// import error from './../Exception/GenericEmailException'
import department from './department'

describe('test: Department', () => {
  it('test: should be valid department', () => {
    strictEqual(department.validate('engineering'), true)
    strictEqual(department.validate('sales'), true)
    strictEqual(department.validate('finance'), true)
    strictEqual(department.validate('hr'), true)
    strictEqual(department.validate('it'), true)
    strictEqual(department.validate('marketing'), true)
    strictEqual(department.validate('operations'), true)
    strictEqual(department.validate('management'), true)
    strictEqual(department.validate('executive'), true)
    strictEqual(department.validate('legal'), true)
    strictEqual(department.validate('support'), true)
    strictEqual(department.validate('communication'), true)
    strictEqual(department.validate('software'), true)
    strictEqual(department.validate('security'), true)
    strictEqual(department.validate('pr'), true)
    strictEqual(department.validate('warehouse'), true)
    strictEqual(department.validate('diversity'), true)
    strictEqual(department.validate('administrative'), true)
    strictEqual(department.validate('facilities'), true)
    strictEqual(department.validate('accounting'), true)
    strictEqual(department.validate(null), true)
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
