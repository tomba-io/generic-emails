import { equal } from 'assert'
import { assert } from 'chai'

import error from './../Exception/GenericEmailException'
import email from './emails'

describe('test: Email', () => {
  it('test: should be valid email', () => {
    const dev: string = 'dev@tomba.io'

    equal(email.validate(dev), true)
  })

  it('test: should be valid hash', () => {
    const emails_hash: Array<string> = [
      '432a7362c4952665bf56606e833f7f29@tomba.io', // md4
      'f58408ea0fe53bcc4e4af4354761a2d3@tomba.io', // md5
      '2a70de11d3488a3dde14ed2f8227ff573d3904e9@tomba.io', // sha1
      '0083dbedbb5fae8051dfdeb18fc4f24927a9689b5cad52cdf525aeeab3061651@tomba.io', // sha256
      'fef637dab76f47de4cc597d6488a1dc8d0cf8d8fcdee33c22477c12594503be7bcc84e1523f05c9140636b7cc2091ec0@tomba.io', // sha384
      '55a27a22471c08a7815371f6ee306cc298d0a20b3ff9b302ea1f6cba70055e748bce6bfb67d3b776c7efa229015f2a6faffcda6c1ea38a08acb49e0951bb6a62@tomba.io', // sha512
      '948a9839e941976d9ac869013971a981@tomba.io', // ripemd128
      '27e3ea050bbadd2f28a57906b61ddfebdf9fda19@tomba.io', // ripemd160
      '122c9240e6809bfcbe38e2106b46503b@tomba.io', // tiger128
      '122c9240e6809bfcbe38e2106b46503be59863fc@tomba.io', // tiger160
      '122c9240e6809bfcbe38e2106b46503be59863fc3b4ba77e@tomba.io', // tiger192
      'befa758d@tomba.io', // crc32
      'bf25130d@tomba.io', // crc32b
    ]
    emails_hash.map((i) => {
      assert.throws(
        () => {
          email.validate(i)
        },
        error,
        'Invalid email address: is IsHash'
      )
    })
  })

  it('test: should be valid uuid', () => {
    const v1: string = 'd46af0b0-4623-11eb-a3d6-cf363b3ff0bd@tomba.io'
    const v4: string = '05a215a7-904e-4b9f-a4a6-6af961907ce5@tomba.io'
    assert.throws(
      () => {
        email.validate(v1)
      },
      error,
      'Invalid email address: is uuid'
    )
    assert.throws(
      () => {
        email.validate(v4)
      },
      error,
      'Invalid email address: is uuid'
    )
  })
})
