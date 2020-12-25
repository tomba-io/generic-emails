import error from './../Exception/GenericEmailException'

/**
 * List Seniority name.
 */
export type Seniorityname = 'junior' | 'senior' | 'executive' | null

/**
 * Tomba Seniority class
 * @date: 2020-12-24 20:27:49
 * @link      https://tomba.io
 * @author    Mohamed Ben rebia <b.mohamed@tomba.io>
 * @license   https://opensource.org/licenses/MIT The MIT License
 */
export default class Seniority {
  /**
   * Helper method for validating Tomba seniority name
   * @param name
   *
   * ### example
   * ```js
   *  Seniority.validate("junior")
   * ```
   */
  static validate(name: Seniorityname): boolean {
    const seniority: Array<Seniorityname> = [
      'junior',
      'senior',
      'executive',
      null,
    ]
    if (seniority.includes(name) === false) {
      throw new error('Invalid seniority name')
    }
    return true
  }
}
