import error from './../Exception/GenericEmailException'

/**
 * Tomba Department class
 * @date: 2020-12-24 20:27:49
 * @link      https://tomba.io
 * @author    Mohamed Ben rebia <b.mohamed@tomba.io>
 * @license   https://opensource.org/licenses/MIT The MIT License
 */

/**
 * List Department name.
 */
export type Departmentname =
  | 'engineering'
  | 'finance'
  | 'it'
  | 'hr'
  | 'marketing'
  | 'operations'
  | 'management'
  | 'executive'
  | 'legal'
  | 'support'
  | 'communication'
  | 'software'
  | 'security'
  | 'pr'
  | 'warehouse'
  | 'diversity'
  | 'administrative'
  | 'facilities'
  | 'accounting'
  | null

export default class Department {
  /**
   * Helper method for validating Tomba department name
   * @param name
   *
   * ### example
   * ```js
   *  Department.validate("finance")
   * ```
   */
  static validate(name: Departmentname): boolean {
    const department: Array<Departmentname> = [
      'engineering',
      'finance',
      'hr',
      'it',
      'marketing',
      'operations',
      'management',
      'executive',
      'legal',
      'support',
      'communication',
      'software',
      'security',
      'pr',
      'warehouse',
      'diversity',
      'administrative',
      'facilities',
      'accounting',
      null,
    ]
    if (department.includes(name) === false) {
      throw new error('Invalid department name')
    }
    return true
  }
}
