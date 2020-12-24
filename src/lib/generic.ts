import * as fs from 'fs'
// import email from './validation/emails'
// import Data from './../emails.json'

export interface GenericData {
  email?: string
  isgeneric?: boolean
  department?: string
  position?: string
  seniority?: string
}

export interface Generic {
  emails?: Email[]
}

export interface Email {
  email?: string
  department?: string
  position?: string
  seniority?: string
}

/**
 * Tomba GenericEmail class
 * @date: 2020-12-24 20:27:49
 * @link      https://tomba.io
 * @author    Mohamed Ben rebia <b.mohamed@tomba.io>
 * @license   https://opensource.org/licenses/MIT The MIT License
 */
export default class GenericEmail {
  /**
   * Helper method for checking email address if is Generic with additional fields
   * @param _email The Email address for checking
   *
   * ### example
   * ```js
   *  await GenericEmail.isGeneric("info@tomba.io")
   * ```
   */
  static async isGeneric(_email: string): Promise<GenericData> {
    const data = JSON.parse(fs.readFileSync('emails.json', 'utf8')).emails
    const check: GenericData = await data.find(
      (item: Email) =>
        item.email === (_email.split('@')[0] ? _email.split('@')[0] : _email)
    )

    if (check !== undefined) {
      delete check.email
      return { ...check, isgeneric: true, email: _email }
    } else {
      return {
        isgeneric: false,
        email: _email,
        department: undefined,
        position: undefined,
        seniority: undefined,
      }
    }
  }
}
