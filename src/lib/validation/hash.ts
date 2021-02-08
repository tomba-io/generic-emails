import error from './../Exception/GenericEmailException'

/**
 * Tomba Hash class
 * @date: 2020-12-24 20:27:49
 * @link      https://tomba.io
 * @author    Mohamed Ben rebia <b.mohamed@tomba.io>
 * @author    Abedrahim Ben rebia <b.abedrahim@tomba.io>
 * @license   https://opensource.org/licenses/MIT The MIT License
 */

// type Algoname = "md4" | "md5" | "sha1" | "sha256" | "ripemd128" | "ripemd160" | "tiger128" | "tiger160" | "tiger192" | "crc32" | "crc32b"

export default class Hash {
  /**
   * Helper method for checking string if is hash
   * @param _str your string
   * @param _algorithm algo name ,Algorithm is one of "md4" | "md5" | "sha1" | "sha256" | "ripemd128" | "ripemd160" | "tiger128" | "tiger160" | "tiger192" | "crc32" | "crc32b"
   * @see {@link https://github.com/asaskevich/govalidator/blob/7a23bdc65eef5f3783e782b436f3065eae3fc72d/validator.go#L577/|GitHub}
   *
   * ### example
   * ```js
   *  Hash.IsHash("432a7362c4952665bf56606e833f7f29", "md4")
   * ```
   */
  static IsHash(_str: string, _algorithm: string): boolean {
    let len: string | boolean
    const algo: string = _algorithm.toLowerCase()
    if (algo === 'crc32' || algo === 'crc32b') {
      len = '8'
    } else if (
      algo === 'md5' ||
      algo === 'md4' ||
      algo === 'ripemd128' ||
      algo === 'tiger128'
    ) {
      len = '32'
    } else if (algo === 'sha1' || algo === 'ripemd160' || algo === 'tiger160') {
      len = '40'
    } else if (algo === 'tiger192') {
      len = '48'
    } else if (algo === 'sha256') {
      len = '64'
    } else {
      len = false
    }

    if (typeof len === 'string') {
      const re = RegExp(`^[a-f0-9]{${len}}$`)
      const test: boolean = re.test(_str.split('@')[0])

      if (test === true) {
        throw new error(`Invalid email address: is IsHash`)
      } else {
        return false
      }
    } else {
      return false
    }
  }

  /**
   * checks is a string is a crc32 hash
   * @param _str
   */
  static IsCrc32(_str: string): boolean {
    return Hash.IsHash(_str, 'crc32')
  }

  /**
   * checks is a string is a crc32b hash
   * @param _str
   */
  static isCrc32b(_str: string): boolean {
    return Hash.IsHash(_str, 'crc32b')
  }
  /**
   * checks is a string is a md5 hash
   * @param _str
   */
  static isMd5(_str: string): boolean {
    return Hash.IsHash(_str, 'md5')
  }
  /**
   * checks is a string is a md4 hash
   * @param _str
   */
  static isMd4(_str: string): boolean {
    return Hash.IsHash(_str, 'md4')
  }
  /**
   * checks is a string is a ripemd128 hash
   * @param _str
   */
  static isRipemd128(_str: string): boolean {
    return Hash.IsHash(_str, 'ripemd128')
  }
  /**
   * checks is a string is a tiger128 hash
   * @param _str
   */
  static isTiger128(_str: string): boolean {
    return Hash.IsHash(_str, 'tiger128')
  }
  /**
   * checks is a string is a sha1 hash
   * @param _str
   */
  static isSha1(_str: string): boolean {
    return Hash.IsHash(_str, 'sha1')
  }
  /**
   * checks is a string is a ripemd160 hash
   * @param _str
   */
  static isRipemd160(_str: string): boolean {
    return Hash.IsHash(_str, 'ripemd160')
  }
  /**
   * checks is a string is a tiger160 hash
   * @param _str
   */
  static isTiger160(_str: string): boolean {
    return Hash.IsHash(_str, 'tiger160')
  }
  /**
   * checks is a string is a tiger192 hash
   * @param _str
   */
  static isTiger192(_str: string): boolean {
    return Hash.IsHash(_str, 'tiger192')
  }
  /**
   * checks is a string is a sha256 hash
   * @param _str
   */
  static isSha256(_str: string): boolean {
    return Hash.IsHash(_str, 'sha256')
  }
}
