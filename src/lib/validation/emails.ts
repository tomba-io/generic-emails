import { validate as Isuuid } from 'uuid'
import error from './../Exception/GenericEmailException'

import hash from './hash'

/**
 * Tomba Emails class
 * @date: 2020-12-24 20:27:49
 * @link      https://tomba.io
 * @author    Mohamed Ben rebia <b.mohamed@tomba.io>
 * @license   https://opensource.org/licenses/MIT The MIT License
 */

export default class Emails {
  /**
   * Helper method for validating Tomba email
   * @param email email address
   *
   * ### example
   * ```js
   *  Emails.validate("dev@tomba.io")
   * ```
   */
  static validate(email: string): boolean {
    // check with regex
    if (
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        email
      ) === false
    ) {
      throw new error('Invalid email address')
    }

    // check with hash algorithm

    const algo: Array<string> = [
      'crc32',
      'crc32b',
      'md5',
      'md4',
      'ripemd128',
      'tiger128',
      'sha1',
      'ripemd160',
      'tiger160',
      'tiger192',
      'sha256',
      'sha384',
      'sha512',
    ]

    algo.map((item) => {
      hash.IsHash(email, item)
    })

    // if (Emails.IsHash(email) == true) {
    //   throw new error('Invalid email address: is IsHash')
    // }

    if (Isuuid(email.split('@')[0]) == true) {
      throw new error('Invalid email address: is uuid')
    }
    return true
  }
}
