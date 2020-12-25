import { equal } from 'assert'

import hash from './hash'

describe('test: Hash', () => {
  it('test: should be invalid hash', () => {
    const invalid_hashs: any = {
      md4: 'info',
      md5: 'info',
      sha1: 'info',
      sha256: 'info',
      sha384: 'info',
      SHA512: 'info',
      ripemd128: 'info',
      ripemd160: 'info',
      tiger128: 'info',
      tiger160: 'info',
      tiger192: 'info',
      crc32: 'info',
      crc32b: 'info',
    }

    for (var algo in invalid_hashs) {
      equal(hash.IsHash(invalid_hashs[algo], algo), false)
    }
  })
})
