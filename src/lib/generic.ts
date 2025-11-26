import * as fs from 'fs'
import * as path from 'path'
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
  private static emailsData: Email[] | null = null

  /**
   * Load emails data from JSON file
   */
  private static loadEmailsData(): Email[] {
    if (this.emailsData === null) {
      // Try multiple possible paths for emails.json
      const possiblePaths = [
        path.join(__dirname, 'emails.json'), // Same directory (build)
        path.join(__dirname, '../emails.json'), // One level up (build)
        path.join(__dirname, '../../emails.json'), // Root (build to src)
        path.join(process.cwd(), 'emails.json'), // Project root
      ]

      let foundPath: string | null = null
      for (const emailPath of possiblePaths) {
        if (fs.existsSync(emailPath)) {
          foundPath = emailPath
          this.emailsData = JSON.parse(
            fs.readFileSync(emailPath, 'utf8')
          ).emails
          break
        }
      }

      if (this.emailsData === null || !foundPath) {
        throw new Error(
          `emails.json file not found. Tried paths: ${possiblePaths.join(', ')}`
        )
      }
    }
    return this.emailsData
  }

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
    if (!_email || typeof _email !== 'string') {
      throw new Error('Email parameter is required and must be a string')
    }

    const emailLocal = _email.includes('@') ? _email.split('@')[0] : _email
    const data = this.loadEmailsData()

    const check = data.find((item: Email) => item.email === emailLocal)

    if (check) {
      const { email: _, ...rest } = check
      return {
        ...rest,
        isgeneric: true,
        email: _email,
      }
    }

    return {
      isgeneric: false,
      email: _email,
      department: undefined,
      position: undefined,
      seniority: undefined,
    }
  }
}
