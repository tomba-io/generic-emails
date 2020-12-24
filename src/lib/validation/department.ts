import error from './../Exception/GenericEmailException'

/**
 * Tomba Department class
 * @date: 2020-12-24 20:27:49
 * @link      https://tomba.io
 * @author    Mohamed Ben rebia <b.mohamed@tomba.io>
 * @license   https://opensource.org/licenses/MIT The MIT License
 */
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
  static validate(name: string): boolean {
    const department: Array<any> = [
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
