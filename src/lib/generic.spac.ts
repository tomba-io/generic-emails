import { strictEqual } from 'assert'

import lib from './generic'

describe('Test: Generic email check', () => {
  it('test: should be Generic email', async () => {
    const email_info: string = 'info'
    const email_agent: string = 'agent'
    const email_info_with_domain: string = 'info@tomba.io'
    const email_agent_with_domain: string = 'agent@tomba.io'

    const info_with_domain = await lib.isGeneric(email_info_with_domain)
    const agent_with_domain = await lib.isGeneric(email_agent_with_domain)

    const info = await lib.isGeneric(email_info)
    const agent = await lib.isGeneric(email_agent)

    strictEqual(info.isgeneric, true)
    strictEqual(info.email, email_info)

    strictEqual(info_with_domain.isgeneric, true)
    strictEqual(info_with_domain.email, email_info_with_domain)

    strictEqual(agent.isgeneric, true)
    strictEqual(agent.email, email_agent)

    strictEqual(agent.isgeneric, true)
    strictEqual(agent.email, email_agent)

    strictEqual(agent_with_domain.isgeneric, true)
    strictEqual(agent_with_domain.email, email_agent_with_domain)
  })

  it('test: should not be Generic email', async () => {
    const mohamed = await lib.isGeneric('mohamed@tomba.io')
    const ben = await lib.isGeneric('ben@tomba.io')

    strictEqual(mohamed.isgeneric, false)
    strictEqual(ben.isgeneric, false)
  })
})
