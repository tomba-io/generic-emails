import error from './../Exception/GenericEmailException'

/**
 * Tomba Hash class
 * @date: 2020-12-24 20:27:49
 * @link      https://tomba.io
 * @author    Mohamed Ben rebia <b.mohamed@tomba.io>
 * @license   https://opensource.org/licenses/MIT The MIT License
 */
export default class Hash {
  /**
   * Helper method for checking string if is hash
   * @param _str your string
   * @param _algorithm algo name ,Algorithm is one of ['md4', 'md5', 'sha1', 'sha256', 'sha384', 'sha512', 'ripemd128', 'ripemd160', 'tiger128', 'tiger160', 'tiger192', 'crc32', 'crc32b']
   * @see {@link https://github.com/asaskevich/govalidator/blob/7a23bdc65eef5f3783e782b436f3065eae3fc72d/validator.go#L577/|GitHub}
   *
   * ### example
   * ```js
   *  Hash.IsHash("432a7362c4952665bf56606e833f7f29", "md4")
   * ```
   */
  static IsHash(_str: string, _algorithm: string): boolean {
    let len: string
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
    } else if (algo === 'sha384') {
      len = '96'
    } else if (algo === 'sha512') {
      len = '128'
    } else {
      return false
    }

    const re = RegExp(`^[a-f0-9]{${len}}$`)
    const test: boolean = re.test(_str.split('@')[0])

    if (test === true) {
      throw new error(`Invalid email address: is IsHash`)
    } else {
      return false
    }
  }
}
